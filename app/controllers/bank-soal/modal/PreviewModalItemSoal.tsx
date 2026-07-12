import type { ModalState } from "~/components/modals/modal-provider";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PgKompleks, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";

export default function PreviewModalItemSoal({state}:{state:ModalState<BankSoalAppType>}){
    console.log(state.payload)
    return (
        <div>
            <h3 className="text-xl text-center">Preview Soal <span className="uppercase">{state.payload?.bentuk_soal}</span></h3>
            Misalnya soal ini diterapkan di nomor 4;
            <div className="border p-1">
                <ol start={4} className=" list-decimal list-outside pl-6 ">
                    <li className="align-top ps-2">
                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    (state.payload?.stimulus ?? "") +
                                    (state.payload?.pertanyaan ?? ""),
                            }}
                        />
                        {
                            state.payload?.bentuk_soal === 'pg' && (
                                <ol start={1} className="list-[upper-alpha] list-outside pl-5">
                                    {
                                        state.payload?.json_alat_jawab && (state?.payload?.json_alat_jawab as PgTunggal | PgKompleks).OpsiPilihanJawaban.map((m,i)=>
                                                <li className="align-top ps-2" key={m.index}>
                                                    <div dangerouslySetInnerHTML={{__html:m.content}}/>
                                                </li>
                                        
                                        )
                                    }
                                </ol>
                            )
                        }
                        {
                            state.payload?.bentuk_soal === 'pg_kompleks' && (
                                <ol start={1} className="list-[upper-alpha] list-outside">
                                    {
                                        state.payload?.json_alat_jawab && (state?.payload?.json_alat_jawab as PgTunggal | PgKompleks).OpsiPilihanJawaban.map((m,i)=>
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
                </ol>
            </div>
        </div>
    )
}