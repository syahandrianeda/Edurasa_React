import { useCallback, useEffect, useMemo } from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { CountdownResult } from "~/lib/get-count-down";
import type { WithTimeStatus } from "~/lib/time-helper";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";

export default function CardInfoItemSiswa({id, data, panggilModal, countdown}:{id:number, data:WithTimeStatus<TagihanHasDataResponse>, panggilModal:(data:WithTimeStatus<TagihanHasDataResponse>)=>void, countdown:CountdownResult}){
    /** statusnya belum dikerjakan */

        const hasResponsed = useMemo(()=> data.data_respons.find(s=>s.siswa_id === id && data.idbaris === s.publikasi_id),[]);
        // console.log(hasResponsed);
    
    return (
        <div className="flex flex-col gap-1 justify-between min-h-24 mb-4 border-b-2 border-dashed border-sky-800 pb-2">
            <p className="text-lg font-bold">{data.nama_publikasi}</p>
            <div className="border p-1 border-sky-600">
                <p>Waktu mulai</p>
                <p className="text-end">{data.start_time.toLocaleString('id-ID', {dateStyle:'full'})}</p>
                <p className="text-end">Pukul : {data.start_time.toLocaleString('id-ID', {timeStyle: 'long'})}</p>
            </div>
            <div className="border p-1  border-sky-600">
                <p>Berakhir pada:</p>
                <p className="text-end">{data.end_time.toLocaleString('id-ID', {dateStyle:'full'})}</p>
                <p className="text-end">Pukul : {data.end_time.toLocaleString('id-ID', {timeStyle: 'long'})}</p>
            </div>
            <div className="flex justify-end">
                {
                    countdown.status  === 'ongoing' && (
                        
                            hasResponsed ? (
                                <p>Sudah dikerjakan</p>
                            ):(
                                <ButtonCommitAwesome labelButton="Mulai Kerjakan" className="px-4 py-0 text-[10px]" onClick={()=>panggilModal(data)}/>

                                )
                            )

                        
                    }
                {countdown.status  === 'upcoming' && <div className="flex"><p>Segera hadir : {data.start_time.toLocaleString('id-ID', {timeStyle: 'long'})}</p></div>}
                {
                    countdown.status  === 'elapsed' && (
                        hasResponsed ? (
                            <p className="text-green-600 font-bold">Sudah dikerjakan</p>
                        ):(
                            <p className="text-rose-600 font-bold">Ananda melewati tugas ini</p>
                            

                        )
                    )
                }
            </div>
        </div>
    )
}