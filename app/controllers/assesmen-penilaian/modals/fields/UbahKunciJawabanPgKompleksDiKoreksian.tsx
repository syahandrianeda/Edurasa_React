import { Globe2, Loader } from "lucide-react";
import { useState } from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import { toast } from "sonner";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import dataFormItemSoalNormalize from "~/domain/bank-soal/normalizer-data-form-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { indexToAbjad, indexesToAbjadList } from "~/domain/bank-soal/koreksi";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";
import { cn } from "~/lib/utils";

export default function UbahKunciJawabanPgKompleksDiKoreksian({ dataSoal, onBerhasil }: {
    dataSoal: BankSoalAppType;
    /** dipanggil setelah kunci tersimpan agar UI koreksi bisa refresh tanpa menutup popover */
    onBerhasil?: (valid: number[]) => void;
}) {
    const { actions: Post, state } = useCrudBankSoalProvider();
    const alatJawab = dataSoal.json_alat_jawab as PgKompleksType | undefined;
    const opsi = (alatJawab?.OpsiPilihanJawaban ?? []).filter(o => o.content !== "");

    const [kunci, setKunci] = useState<number[]>(() => {
        if (!Array.isArray(alatJawab?.valid)) return [];
        return alatJawab.valid
            .filter((m): m is number => typeof m === 'number')
            .sort((a, b) => a - b);
    });

    const handleToggle = (index: number) => {
        setKunci(prev => prev.includes(index)
            ? prev.filter(m => m !== index)
            : [...prev, index].sort((a, b) => a - b)
        );
    };

    const onSubmit = () => {
        if (kunci.length === 0) return;

        const jsonBaru = {
            ...(dataSoal.json_alat_jawab ?? {}),
            valid: kunci,
        } as BankSoalAppType["json_alat_jawab"];

        const data = {
            ...dataSoal,
            jawaban: kunci.map(indexToAbjad),
            json_alat_jawab: jsonBaru,
        } as BankSoalAppType;

        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        const par = dataFormItemSoalNormalize(dtoBankSoal, { name: data.bentuk_soal } as ListBentukSoalType);

        toast.promise(Post.update(par), {
            loading: "Sedang mengupdate",
            success: (response) => {
                const { success, data: dataRespon, detailResponse } = response;
                DispatchingResponseToStore(success, dataRespon as BankSoalSheetType[], detailResponse!);
                onBerhasil?.(kunci);
                return "Berhasil mengupdate kunci jawaban";
            },
            error: (err) => "Gagal mengupdate, " + err,
            closeButton: true,
        });
    };

    return (
        <div className="border-t-2 text-[10px] space-y-1">
            <p className="text-nowrap">Ubah Kunci Jawaban (bisa lebih dari satu):</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
                {opsi.map((o, i) => {
                    const dipilih = kunci.includes(i);
                    return (
                        <label
                            key={o.index + "_" + i}
                            className={cn(
                                "flex items-center gap-1 px-1 rounded cursor-pointer",
                                dipilih ? "bg-green-300 dark:text-black" : "bg-inherit"
                            )}
                        >
                            <input
                                type="checkbox"
                                className="size-3"
                                checked={dipilih}
                                disabled={state.isSubmitting}
                                onChange={() => handleToggle(i)}
                            />
                            <span>{indexToAbjad(i)}</span>
                        </label>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-nowrap">
                    Kunci: {kunci.length === 0 ? 'belum dipilih' : indexesToAbjadList(kunci)}
                </span>
                <ButtonCommitAwesome
                    disabled={state.isSubmitting || kunci.length === 0}
                    labelButton="Simpan"
                    className="px-4 py-0 text-[10px]"
                    onClick={onSubmit}
                >
                    {state.isSubmitting ? <Loader size={12} className="animate-spin self-center" /> : <Globe2 size={12} />}
                </ButtonCommitAwesome>
            </div>
        </div>
    );
}
