import { useAppSelector } from "~/context-reduct/hook"
import { PublikasiPaketSoalAppStaticSelector } from "~/context-reduct/selectores/publikasi-paket-soal";
import {useMemo} from 'react';
import type { UserSiswa } from "~/types/user-siswa";
import type { User } from "~/types";
import CardInfoItemSiswa from "./card-item-info-siswa";

export default function RingkasanInfoSiswa(){
    const soalPublikasi = useAppSelector(PublikasiPaketSoalAppStaticSelector);
    const user = useAppSelector(s=>s.auth.user) as User as UserSiswa

    const currentSoalPublikasi = useMemo(()=>{
        if(!soalPublikasi || !user) return [];
        return soalPublikasi.filter(s=>(s.target_rombel.includes(user.rombel) && s.paket_soal_id !== 0) || (s.target_person.length>0 && s.target_person.includes(user.id)) )

    },[soalPublikasi, user])
    console.log({soalPublikasi, currentSoalPublikasi})
    return (
        <div className="border-b mt-7 p-2 rounded-2xl bg-sky-200">
            {
                currentSoalPublikasi?.length && (
                    <>
                    <p>Hari ini Ananda ada tugas baru untuk dikerjakan</p>
                    <ol className="list-decimal list-outside ps-4">
                        {
                            currentSoalPublikasi.map((data, iData)=>
                                <li key={data.idbaris}>
                                    <CardInfoItemSiswa data={data}/>
                                </li>
                            )

                        }
                        
                    </ol>
                    </>
                )
            }
            
        </div>
    )
}