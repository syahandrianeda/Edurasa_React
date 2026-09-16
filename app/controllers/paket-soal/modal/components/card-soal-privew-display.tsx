import OpsiSoalPreview from "~/controllers/koleksi-bank-soal/views/opsi-soal-preview";
import PreviewKunciJawaban from "~/controllers/koleksi-bank-soal/views/preview-kunci-jawaban-pembahasan";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { FormatElemen } from "~/types/bank-soal/bentuk-soal-type";


export default function CardSoalPreviewDisplay({noDisplay, data, modeDisplay, showStimulus}:{noDisplay:number, data:BankSoalAppType, modeDisplay:FormatElemen, showStimulus:boolean}){
    const shortNameBentukSoal = (name:string)=>ListBentukSoal.find(s=>s.name === name)?.shortName
    return (
        <div className="border mt-4 rounded-b-xl relative text-[12px] shadow-lg bg-white dark:text-black">
            {/* badge */}
            <div className="absolute -top-1 -translate-y-1/2 left-1 flex justify-center gap-2 text-[10px]">
                <div className="h-4 min-w-4 border-sky-400 rounded-tr-2xl ps-1 pe-4 bg-linear-to-b from-sky-300 to-sky-50 border-t">{data.mapel_name}</div>
            </div>
            <div className="absolute -top-1 -translate-y-1/2 right-2 flex justify-center gap-2 text-[10px]">
                <div className="h-4 min-w-4 border-sky-400 rounded-t-2xl text-center px-2 border-t bg-linear-to-b from-amber-100 to-sky-100/90">{shortNameBentukSoal(data.bentuk_soal)}</div>
                {
                    data.fase_jenjang.map((m, i)=>
                        <div key={i} className="h-4 min-w-4 border-sky-400 rounded-t-2xl px-2  border-t bg-sky-100">Kelas {m}</div>
                    )
                }
            </div>
            <div className="mt-3 flex flex-row min-h-8">
                <div className="ps-1 pe-4 w-fit">{noDisplay}.</div>
                <div className="ps-1 pe-4 flex-1 min-w-0 text-wrap">
                    {
                        (showStimulus && data.stimulus) && (
                            <div dangerouslySetInnerHTML={{__html:data.stimulus}}/>
                        )
                    }
                    <div className="text-wrap" dangerouslySetInnerHTML={{__html:data.pertanyaan}}/>
                    {
                        data.json_alat_jawab && (
                            <OpsiSoalPreview data={data} setDisplay={modeDisplay}/>
                        )
                    }
                </div>
            </div>
            <div className="border-t-2 ps-2 text-[10px]">
                <PreviewKunciJawaban data={data}/>
            </div>
        </div>
    )
}