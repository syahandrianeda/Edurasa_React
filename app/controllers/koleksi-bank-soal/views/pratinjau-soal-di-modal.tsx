import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type";

export default function PratinjauItemSoalModal({currentData}:{currentData:BankSoalAppType}){
    return (
        <div className="border p-2 rounded-2xl h-90 overflow-y-auto scrol-h-custom bg-white dark:text-black dark:border-sky-300 text-sm editor-document shadow-lg shadow-slate-400">
                        <ol start={2} className=" list-decimal list-outside pl-6 ">
                            <li> ... </li>
                            <li> ... </li>
                            <li className="align-top ps-2">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:(currentData.stimulus)+(currentData.pertanyaan),
                                    }}
                                />
                                {
                                    currentData.bentuk_soal === 'pg' && (
                                        <ol start={1} className="list-[upper-alpha] list-outside pl-5">
                                            {
                                                currentData.json_alat_jawab && (currentData.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                                                        <li className="align-top ps-2" key={m.index}>
                                                            <div dangerouslySetInnerHTML={{__html:m.content}}/>
                                                        </li>
                                                
                                                )
                                            }
                                        </ol>
                                    )
                                }
                                {
                                    currentData.bentuk_soal === 'pg_kompleks' && (
                                        <ol start={1} className="list-[upper-alpha] list-outside">
                                            {
                                                currentData.json_alat_jawab && (currentData.json_alat_jawab as  PgKompleksType).OpsiPilihanJawaban.map((m,i)=>
                                                        <li className="align-top flex gap-2" key={m.index}>
                                                            <input type='checkbox'/>
                                                            <label dangerouslySetInnerHTML={{__html:m.content}}/>
                                                        </li>
                                                
                                                )
                                            }
                                        </ol>
                                    )
                                }
                                
                            </li>
                            <li> ... </li>
                        </ol>
                    </div>
    )
}