import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type";

export default function PgPreview({data}:{data:BankSoalAppType}){
    return (
        <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
            {
                data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                        <li className="align-top ps-2" key={m.index + "_"+ i}>
                            <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                        </li>
                
                )
            }
        </ol>
    )
}