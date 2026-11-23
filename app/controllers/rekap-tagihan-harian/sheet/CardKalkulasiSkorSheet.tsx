import type { ReactNode } from "react"

type Props = {
    jumlahInstrumen:number|null,
    jumlahSkor:number|null
    skor:number|null,
    fokus:string,
    pembulatan?:number,
    children?:ReactNode

}
export default function CardKalkulasiSkorSheet ({
    jumlahInstrumen,
    jumlahSkor,
    fokus,
    children,
    skor,
    pembulatan=2
}:Props){
    return (
        <div className="mt-4 mb-2 rounded shadow-md shadow-slate-400 p-1 min-h-18 min-w-28 outline-1 text-[8px] flex flex-col gap-1">
            {
                children
            }
            <div className="flex w-full justify-between border-b border-dotted border-sky-400">
                <p>Jumlah Instrumen</p>
                <p>{jumlahInstrumen}</p>
            </div>
            <div className="flex w-full justify-between border-b border-dotted border-sky-400">
                <p>Total Skor</p>
                <p>{jumlahSkor}</p>
            </div>
            <div className="flex w-full justify-between items-end brder-b mt-2 font-bold border-b border-dotted border-sky-400">
                <p>NIlai {fokus}</p>
                <p className="text-md">{skor?.toFixed(pembulatan)}</p>
            </div>

        </div>
    )
}