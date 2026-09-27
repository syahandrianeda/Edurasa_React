import { useCallback } from "react";
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type";
import type { Props } from "./input-opsi-jawaban-online";

export function FormPgOnline({ data, no_prefix, dataRespon, handleChange }: Props) {
    //String.fromCharCode(65+m)
    const handleCheck = useCallback((i: number) => {
        
        const isCorrect = (data.json_alat_jawab as PgTunggalType).valid.includes(i) ? 100 : 0;
        handleChange(dataRespon, String.fromCharCode(i + 65), isCorrect);

    }, [data?.json_alat_jawab, handleChange]);
    return (
        <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
            {data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m, i) => m.content !== "" && <li className="align-top ps-2 has-checked:bg-green-300 has-checked:after:contain-content['✓']" key={m.index + "_" + i}>
                <input id={data.bentuk_soal + '_' + no_prefix + "_" + i} className="hidden" checked={dataRespon.respon === String.fromCharCode(i + 65)} type="radio" name={data.bentuk_soal + '_' + no_prefix} onChange={() => handleCheck(i)} />
                <label htmlFor={data.bentuk_soal + '_' + no_prefix + "_" + i}>
                    <div className="text-wrap editor-document" dangerouslySetInnerHTML={{ __html: m.content }} />
                </label>
            </li>

            )}
        </ol>
    );
}
