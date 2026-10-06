import { Globe2, Loader } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import { toast } from "sonner";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import dataFormItemSoalNormalize from "~/domain/bank-soal/normalizer-data-form-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";

export default function UbahKunciJawabanDiKoreksian({ dataSoal , setOpen}: { dataSoal: BankSoalAppType , setOpen:(b:boolean)=>void}) {
    const { actions: Post, state } = useCrudBankSoalProvider();
    const [kunciAbjad, setKunciAbjad] = useState<string>((dataSoal.jawaban as string[])[0]);

    const abjadToIndex = useMemo(() => {
        if (!kunciAbjad) return 0;
        const indexAbjad = ["A", "B", "C", "D"];
        const index = indexAbjad.findIndex((s) => s === kunciAbjad);
        return index;
    }, [kunciAbjad]);

    const onSelectTarget = (value: string) => {
        setKunciAbjad(value);
    };

    const onSubmit = () => {
        console.log('idbaris banksoal', dataSoal.idbaris);
        const jsonAlatJawab = dataSoal.json_alat_jawab;
        const valid = jsonAlatJawab?.valid as number[];

        const jsonBaru = {
            ...(jsonAlatJawab ?? {}),
            valid: [abjadToIndex],
        } as BankSoalAppType["json_alat_jawab"];

        const data = {
            ...dataSoal,
            jawaban: [kunciAbjad],
            json_alat_jawab: jsonBaru,
        } as BankSoalAppType;

        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        const par = dataFormItemSoalNormalize(dtoBankSoal, { name: data.bentuk_soal } as ListBentukSoalType);

        toast.promise(Post.update(par), {
            loading: "Sedang mengupdate",
            success: (response) => {
                const { success, data: dataRespon, detailResponse } = response;
                DispatchingResponseToStore(success, dataRespon as BankSoalSheetType[], detailResponse!);
                setOpen(false);
                return "Berhasil mengupdate kunci jawaban, jika belum berubah di tempat koreksian, tutup dan buka kembali";
            },
            error: (err) => "Gagal mengupdate, " + err,
            closeButton: true,
            // finally:()=>{
            //     setOpen(false);
            // }
        });
    };

    return (
        <div className="border-t-2 text-[10px] flex gap-2 items-center">
            <p className="text-nowrap">Ubah Kunci Jawaban:</p>
            <Select value={kunciAbjad} onValueChange={onSelectTarget} disabled={state.isSubmitting}>
                <SelectTrigger className="bg-white w-full rounded-tl-none text-[10px]">
                    <SelectValue placeholder="Pilih target Paket" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:text-black w-1/3 text-[10px]">
                    <SelectItem value="A" className="text-[10px]">
                        A
                    </SelectItem>
                    <SelectItem value="B" className="text-[10px]">
                        B
                    </SelectItem>
                    <SelectItem value="C" className="text-[10px]">
                        C
                    </SelectItem>
                    <SelectItem value="D" className="text-[10px]">
                        D
                    </SelectItem>
                </SelectContent>
            </Select>
            <ButtonCommitAwesome
                disabled={state.isSubmitting}
                labelButton="Simpan"
                className="px-4 py-0 text-[10px]"
                onClick={onSubmit}
            >
                {state.isSubmitting ? <Loader size={12} className="animate-spin self-center" /> : <Globe2 size={12} />}
            </ButtonCommitAwesome>
        </div>
    );
}