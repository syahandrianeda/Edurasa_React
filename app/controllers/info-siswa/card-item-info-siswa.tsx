import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";

export default function CardInfoItemSiswa({data}:{data:PublikasiPaketAppType}){
    return (
        <div className="flex flex-col justify-between min-h-24 border mb-4">
            <p className="text-lg font-bold">{data.nama_publikasi}</p>
            <div>
                <p>{data.start_time.toLocaleString('id-ID', {dateStyle:'full'})}</p>
                <p>Pukul : {data.start_time.toLocaleString('id-ID', {timeStyle: 'long'})}</p>
            </div>
            <div>
                Kontrol mau mengerjakan
            </div>
        </div>
    )
}