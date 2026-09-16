import { useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { jadwalPelajaranAppSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { KurmerDtoSelector } from "~/context-reduct/selectores/kurmer-selector";
import { OrmProtaInstanceSelector } from "~/context-reduct/selectores/orm-promes-selector";
import { DtoProtaSelector } from "~/context-reduct/selectores/prota-selector";
import TableKalkulasiJp from "~/controllers/prota/tables/tabel-kalkulasi-jp";
import TableTitleProta from "~/controllers/prota/tables/tabel-title-prota";
import TableAlokasiWaktuProta from "~/controllers/prota/tables/table-alokasi-prota";
import OrmProta from "~/domain/kurikulum/orm-prota";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export default function ProtaPage(){
     const ormKaldik = useAppSelector(instanceOfKaldik);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const cpFaseAtp = useAppSelector(KurmerDtoSelector);
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const prota = useAppSelector(DtoProtaSelector);
    const user = useAppSelector(state=>state.auth.user);
    const instansiasi = useAppSelector(OrmProtaInstanceSelector)
    // const instansiasi = useMemo(()=>{
    //     const kaldik = ormKaldik;
    //     const inprota = user && new OrmProta(cpFaseAtp,jadwal,kaldik,fokusMapel,rombel ?? getSessionRombel(),user,prota).init();//.createKoleksiMapelInJadwal().koleksiMapelInJadwal
    //     return inprota
    // },[ormKaldik,fokusMapel,cpFaseAtp,jadwal,rombel,user,prota]);
    
    if(!instansiasi) return 'Not Found'
    return (
        <div className="p-1">
            {
                instansiasi.isWarning?(
                    <div className="min-h-full">
                        <h3 className="text-2xl text-center font-extrabold uppercase mb-3">Belum Teredia</h3>
                        Keterangan:
                        <ol className="list-decimal list-inside">
                            {
                                instansiasi.messageWarning.map((data,index)=>(
                                    <li key={index} className="list-item">{data}</li>
                                ))
                            }
                        </ol>
                    </div>
                ):(
                    <>
                        <h3 className="text-2xl text-center font-extrabold uppercase mb-7">Program Tahunan</h3>
                        <div className="w-full">
                            <TableTitleProta prota={instansiasi}/>
                        </div>
                        
                        <h4 className="text-xl font-extrabold mt-4">A. Perhitungan Jam Efektif Belajar</h4>
                            <p>Berdasarkan pengaturan jadwal pelajaran pada mata pelajaran ini dan Kalender Pendidikan sekolah, maka perhitungan Jam Efektif Belajar:</p>
                            {instansiasi.dataPerhitunganJp && <TableKalkulasiJp data={instansiasi.dataPerhitunganJp}/>}
                        <h4 className="text-xl font-extrabold mt-3">B. Distribusi Alokasi Waktu</h4>
                            <TableAlokasiWaktuProta prota={instansiasi.dataPresentastionProta}/>
                        
                    </>
                )
            }
        </div>
    )
}