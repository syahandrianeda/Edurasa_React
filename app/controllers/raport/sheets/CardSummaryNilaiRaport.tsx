import { cn } from "~/lib/utils";
import type { DataRekapRaportSementaraSheetPreview } from "./SheetDetailRekapRaportSementara";

export default function CardSummaryNilaiRaport({item}:{item: DataRekapRaportSementaraSheetPreview | null}){
    console.log('cardSummaryNilaiRaport',{item});
    // const dat = 
    return (
        <div className="mt-4 mb-2 rounded shadow-md shadow-slate-400 p-1 min-h-18 min-w-28 outline-1 flex gap-2 md:flex-row flex-col">
            <div className="flex md:flex-col border rounded-lg p-1 gap-2 justify-evenly">
                <div className="flex border flex-col justify-stretch items-center gap-2 p-2 shadow-md shadow-purple-300 rounded-lg">
                    <div className="text-[10px]">Kompetensi yang dipilih:</div>
                    <div className="font-extrabold text-2xl uppercase">{item?.keyStruktur}</div>
                </div>

                <div className="flex border flex-col justify-stretch items-center gap-2 p-2 shadow-md shadow-sky-300 rounded-lg">
                    <div className="text-[10px]">Nilai Raport:</div>
                    <div className="font-extrabold text-3xl">{item?.data?.nilaiRaport?.toFixed(0)}</div>
                    <div className="text-[8px]">Nilai Pembulatan dari <strong>{item?.data?.nilaiRaport?.toFixed(2)}</strong></div>
                </div>

            </div>
            <div className="flex-1 border flex-col justify-stretch items-center gap-2 p-2 shadow-lg rounded-lg">
                <div className="text-[10px]">Nilai Per Kompetensi:</div>
                <div className="grid grid-cols-2 md:grid-cols-3 text-[10px] w-full gap-1 md:gap-2 p-1">
                    {
                        item?.data?.sumberMaxMin.map((nilai, iNilai)=>
                            <div key={nilai.idType+'_'+iNilai} className="flex flex-col rounded outline-1 p-1 shadow-md shadow-teal-300">
                                <p className="flex justify-between border-b-2 items-center uppercase"><span>ID {item?.keyStruktur}:</span> <span className="font-bold text-sm text-blue-600">{nilai.idType}</span></p>
                                <p className={cn("font-extrabold text-lg text-center", nilai.isMax && 'bg-green-300', nilai.isMin && 'bg-rose-300')}>{nilai.skor?.toFixed(2)}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}