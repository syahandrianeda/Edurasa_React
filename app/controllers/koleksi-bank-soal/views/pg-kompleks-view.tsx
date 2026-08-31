import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";

export default function PgKompleksPreview({data}:{data:BankSoalAppType}){
    return (
        <ol start={1} className="list-[upper-alpha] list-outside">
            {
                data.json_alat_jawab && (data.json_alat_jawab as PgKompleksType).OpsiPilihanJawaban.map((m,i)=>
                        <li className="align-top ps-2 flex gap-2" key={m.index + '_'+ i}>
                            <input type="checkbox"/>
                            <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                        </li>
                
                )
            }
        </ol>
    )
}