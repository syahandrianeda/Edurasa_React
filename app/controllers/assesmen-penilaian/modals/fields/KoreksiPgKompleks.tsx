import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import {
    abjadListToIndexes,
    hitungSkorPGK,
    indexToAbjad,
    indexesToAbjadList,
    type HandleUpdateResponKoreksi,
} from "~/domain/bank-soal/koreksi";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import PopoverPreviewSoalPgKoreksian from "./popover-preview-soal-pg-koreksian";

const BENTUK_SOAL = 'pg_kompleks';

export function KoreksiPgKompleks({ template, handleUpdate }: {
    template: TemplateKoreksiSiswaType;
    handleUpdate: HandleUpdateResponKoreksi;
}) {
    return (
        <ol className="list-decimal list-outside ps-4 space-y-3">
            {template.data.map((item, index) => (
                <KoreksiPgKompleksItem
                    key={item.no_prefix}
                    item={item}
                    index={index}
                    handleUpdate={handleUpdate}
                />
            ))}
        </ol>
    );
}

function KoreksiPgKompleksItem({ item, index, handleUpdate }: {
    item: DataTemplateKoreksiSiswa;
    index: number;
    handleUpdate: HandleUpdateResponKoreksi;
}) {
    const { soal, no_prefix, respon } = item;
    const alatJawab = soal?.json_alat_jawab as PgKompleksType | undefined;
    const opsi = alatJawab?.OpsiPilihanJawaban ?? [];

    /** kunci hasil edit dari popover; menimpa data soal sampai modal ditutup */
    const [validLokal, setValidLokal] = useState<number[] | undefined>();
    const valid = validLokal ?? alatJawab?.valid ?? [];

    const dipilih = abjadListToIndexes(respon?.respon);
    const skor = hitungSkorPGK(dipilih, opsi, valid);

    /** Sinkronkan skor awal sekali per item, tanpa menimpa override manual guru. */
    const sudahSinkron = useRef(false);
    useEffect(() => {
        if (sudahSinkron.current) return;
        sudahSinkron.current = true;
        if (respon?.skor === skor) return;
        handleUpdate(BENTUK_SOAL, no_prefix, { skor });
    }, [respon?.skor, skor, no_prefix, handleUpdate]);

    /** setelah kunci disimpan, refresh kunci + skor item ini tanpa menutup popover */
    const handleKunciBerubah = (kunciBaru: number[]) => {
        setValidLokal(kunciBaru);
        handleUpdate(BENTUK_SOAL, no_prefix, {
            skor: hitungSkorPGK(dipilih, opsi, kunciBaru),
        });
    };

    /** soal efektif agar preview dan editor kunci membaca kunci terbaru */
    const soalEfektif = soal && validLokal !== undefined
        ? {
            ...soal,
            jawaban: validLokal.map(indexToAbjad),
            json_alat_jawab: {
                ...(soal.json_alat_jawab as PgKompleksType),
                valid: validLokal,
            },
        }
        : soal;

    const handleToggle = (i: number) => {
        const berikut = dipilih.includes(i)
            ? dipilih.filter(x => x !== i)
            : [...dipilih, i];

        /** Pertahankan indeks lain agar respon lama tidak hilang. */
        const terpilih = [...new Set(berikut)].filter(x => x >= 0).sort((a, b) => a - b);

        handleUpdate(BENTUK_SOAL, no_prefix, {
            respon: indexesToAbjadList(terpilih),
            skor: hitungSkorPGK(terpilih, opsi, valid),
        });
    };

    return (
        <li className="border-b border-dashed pb-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold">Soal No. {no_prefix}</span>
                <span>Kunci: {indexesToAbjadList(valid) || '-'}</span>
                <span>Respon: {respon?.respon || '-'}</span>
                <label className="font-bold text-green-800" htmlFor={`${BENTUK_SOAL}_${no_prefix}`}>
                    Skor
                </label>
                <Input
                    id={`${BENTUK_SOAL}_${no_prefix}`}
                    className="min-w-15 bg-white dark:text-black"
                    type="number"
                    min={0}
                    max={100}
                    value={respon?.skor ?? ''}
                    onChange={(e) => {
                        const raw = e.target.value;
                        /** input kosong = tidak mengubah skor */
                        if (raw === '') return;
                        const nilai = Number(raw);
                        if (Number.isNaN(nilai)) return;
                        /** clamp skor pada rentang 0-100 */
                        handleUpdate(BENTUK_SOAL, no_prefix, {
                            skor: Math.min(100, Math.max(0, nilai)),
                        });
                    }}
                />
                <PopoverPreviewSoalPgKoreksian
                    soal={soalEfektif}
                    no_prefix={no_prefix}
                    index={index}
                    kunciTeks={indexesToAbjadList(valid)}
                    modeKunci="multiple"
                    onKunciBerubah={handleKunciBerubah}
                />
            </div>

            <ol className="list-[upper-alpha] list-outside ps-4">
                {opsi.map((o, i) => o.content !== '' && (
                    <li
                        key={o.index + '_' + i}
                        className="flex gap-2 items-start align-top has-checked:bg-green-300"
                    >
                        <input
                            id={`${BENTUK_SOAL}_${no_prefix}_${i}`}
                            type="checkbox"
                            className="mt-1 size-4 shrink-0 accent-sky-700"
                            checked={dipilih.includes(i)}
                            onChange={() => handleToggle(i)}
                        />
                        <label
                            htmlFor={`${BENTUK_SOAL}_${no_prefix}_${i}`}
                            className="flex-1 cursor-pointer"
                        >
                            <div
                                className="text-wrap editor-document"
                                dangerouslySetInnerHTML={{ __html: o.content }}
                            />
                        </label>
                    </li>
                ))}
            </ol>
        </li>
    );
}
