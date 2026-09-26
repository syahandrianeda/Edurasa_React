import { useAppSelector } from "~/context-reduct/hook"
import { PublikasiPaketSoalAppStaticSelector } from "~/context-reduct/selectores/publikasi-paket-soal";
import {useCallback, useEffect, useMemo} from 'react';
import type { UserSiswa } from "~/types/user-siswa";
import type { User } from "~/types";
import CardInfoItemSiswa from "./card-item-info-siswa";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { filterTodayByTime, type WithTimeStatus } from "~/lib/time-helper";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import DigitalClock from "~/components/timer/jam-digital";
import { useCurrentTime } from "~/hooks/use-current-time";
import { getCountdown } from "~/lib/get-count-down";
import { pureResponTagihan, responTagihanCurrentJenjang } from "~/context-reduct/selectores/daftar-tagihan-penilaian-siswa-selector";

export default function RingkasanInfoSiswa(){
    const instancPaketSoal = useAppSelector(InstanceDataTagihanPenilaianSector);
    const user = useAppSelector(s=>s.auth.user) as User as UserSiswa;
    const now = useCurrentTime();
    const  dataTagihan = useMemo(()=>{
        if(!instancPaketSoal?.dataPaketSoalApp || !user) return []
         const dataSoal = instancPaketSoal?.dataTagihanHasResponse;
         const foundCurrent = filterTodayByTime(dataSoal?.filter(s=>s.peserta.some(siswa=>siswa.id === user.id)) , now);//dataSoal?.filter(s=>s.peserta.some(siswa=>siswa.id === user.id))
         return foundCurrent
        },[user, instancPaketSoal?.dataTagihanHasResponse, now])

    const {actions} = useModal();
   
    const panggilSoal = useCallback((item:WithTimeStatus<TagihanHasDataResponse>)=>{
        
        actions.open('PREVIEW PAKET SOAL',{idbaris:item.paket_soal_id, id_file_json:item.id_file_setting})
    },[actions])


    useEffect(()=>{
       
    },[ ])
    
    return (
        <div className="border-b mt-7 p-2 rounded-2xl bg-sky-200 overflow-y-auto">
            <div className="text-end">
                <p>{now.toLocaleTimeString()}</p>
            </div>
            {
                dataTagihan &&  dataTagihan?.length > 0 && (
                    <>
                    <p>Hari ini Ananda ada <strong>{dataTagihan.length} tugas</strong> untuk dikerjakan</p>
                    <div className="h-72 overflow-y-auto scrol-h-custom border-t-2 p-2   bg-linear-to-bl via-purple-100 to-rose-100 border-sky-700 rounded-b-xl">
                        <ol className="list-decimal list-outside ps-4  from-sky-100 ">
                            {
                                dataTagihan.map((data, iData)=>
                                    <li key={data.idbaris}>
                                        <CardInfoItemSiswa id={user.id} data={data} panggilModal={panggilSoal} countdown={getCountdown(data.start_time, data.end_time, now)}/>
                                    </li>
                                )

                            }
                            
                        </ol>
                    </div>
                    </>
                )
            }
            
        </div>
    )
}