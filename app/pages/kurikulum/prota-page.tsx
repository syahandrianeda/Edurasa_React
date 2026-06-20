import TableKalkulasiJp from "~/controllers/prota/tables/tabel-kalkulasi-jp";
import TableTitleProta from "~/controllers/prota/tables/tabel-title-prota";
import TableAlokasiWaktuProta from "~/controllers/prota/tables/table-alokasi-prota";
import type OrmProta from "~/domain/kurikulum/orm-prota";

export default function ProtaPage({prota}:{prota:OrmProta}){
     
    return (
        <div className="p-1">
            {
                prota.isWarning?(
                    <div className="min-h-full">
                        <h3 className="text-2xl text-center font-extrabold uppercase mb-3">Belum Teredia</h3>
                        Keterangan:
                        <ol className="list-decimal list-inside">
                            {
                                prota.messageWarning.map((data,index)=>(
                                    <li key={index} className="list-item">{data}</li>
                                ))
                            }
                        </ol>
                    </div>
                ):(
                    <>
                        <h3 className="text-2xl text-center font-extrabold uppercase mb-7">Program Tahunan</h3>
                        <div className="w-full">
                            <TableTitleProta prota={prota}/>
                        </div>
                        
                        <h4 className="text-xl font-extrabold mt-4">A. Perhitungan Jam Efektif Belajar</h4>
                            <p>Berdasarkan pengaturan jadwal pelajaran pada mata pelajaran ini dan Kalender Pendidikan sekolah, maka perhitungan Jam Efektif Belajar:</p>
                            {prota.dataPerhitunganJp && <TableKalkulasiJp data={prota.dataPerhitunganJp}/>}
                        <h4 className="text-xl font-extrabold mt-3">B. Distribusi Alokasi Waktu</h4>
                            <TableAlokasiWaktuProta prota={prota.dataPresentastionProta}/>
                        
                    </>
                )
            }
        </div>
    )
}