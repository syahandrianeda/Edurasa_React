import { useCallback } from "react";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";
import {
    abjadListToIndexes,
    hitungSkorPGK,
    indexesToAbjadList,
} from "~/domain/bank-soal/koreksi";
import type { Props } from "./input-opsi-jawaban-online";

export function FormPgKompleksOnline({ data, no_prefix, dataRespon, handleChange }: Props) {
    const alatJawab = data.json_alat_jawab as PgKompleksType | undefined;
    const opsi = alatJawab?.OpsiPilihanJawaban ?? [];
    const dipilih = abjadListToIndexes(dataRespon.respon);

    const handleToggle = useCallback((i: number) => {
        const berikut = dipilih.includes(i)
            ? dipilih.filter(index => index !== i)
            : [...dipilih, i];

        /** Pertahankan indeks lain (termasuk opsi yang tidak tampil) agar respon lama tidak hilang. */
        const terpilih = [...new Set(berikut)].filter(index => index >= 0).sort((a, b) => a - b);
        const skor = hitungSkorPGK(terpilih, opsi, alatJawab?.valid);

        handleChange(dataRespon, indexesToAbjadList(terpilih), skor);
    }, [dataRespon, dipilih, opsi, alatJawab?.valid, handleChange]);

    return (
        <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
            {opsi.map((m, i) => m.content !== "" && (
                <li
                    key={m.index + "_" + i}
                    className="flex gap-2 align-top ps-2 has-checked:bg-green-300"
                >
                    <input
                        id={data.bentuk_soal + '_' + no_prefix + "_" + i}
                        className="mt-1 size-4 shrink-0 accent-sky-700"
                        checked={dipilih.includes(i)}
                        type="checkbox"
                        name={data.bentuk_soal + '_' + no_prefix}
                        onChange={() => handleToggle(i)}
                    />
                    <label
                        htmlFor={data.bentuk_soal + '_' + no_prefix + "_" + i}
                        className="flex-1 cursor-pointer"
                    >
                        <div className="text-wrap editor-document" dangerouslySetInnerHTML={{ __html: m.content }} />
                    </label>
                </li>
            ))}
        </ol>
    );
}
