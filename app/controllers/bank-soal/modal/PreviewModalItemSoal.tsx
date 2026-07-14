import type { ModalState } from "~/components/modals/modal-provider";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { PgKompleks, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";

export default function PreviewModalItemSoal({state}:{state:ModalState<BankSoalAppType>}){
    console.log(state.payload)
    return (
        <div className="p-2 border editor-document  overflow-y-scroll h-96 scrol-h-custom">
            <h3 className="text-xl text-center">Preview Soal <span className="uppercase">{state.payload?.bentuk_soal}</span></h3>
            Misalnya soal ini diterapkan di nomor 4:
            <div className="border p-2 rounded-2xl">
                <ol start={2} className=" list-decimal list-outside pl-6 ">
                    <li>...</li>
                    <li>...</li>
                    
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
            <div className="border mt-2 rounded-3xl p-3 text-xs">
                <h4 className="text-base font-bold">Metadata Soal</h4>
                <ul className="list-inside list-disc">
                    <li className="align-top ps-2">
                        Jawaban
                        <div className="border-t-2 border-dotted" dangerouslySetInnerHTML={{__html: state?.payload?.jawaban ?? ''}}/>
                    </li>
                    <li className="align-top ps-2 list-inside">
                        Indikator Soal
                        <div className="border-t-2 indent-4 border-dotted" dangerouslySetInnerHTML={{__html:state?.payload?.indikator_soal ??''}}/>
                    </li>
                    <li className="align-top ps-2">
                        Pembahasan/Penskoran:
                        <div className="border-t-2border-dotted" dangerouslySetInnerHTML={{__html:state?.payload?.pembahasan_penskoran ??''}}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}