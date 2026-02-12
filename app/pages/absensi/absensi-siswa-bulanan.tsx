import { useCallback, useMemo, useState } from "react"
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components"
import TableWithScrolling from "~/components/tabels/table-with-scrolling"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { useAppSelector } from "~/context-reduct/hook"
import { currentTapel } from "~/lib/current-tapel"

import TooltipComp from "~/components/ui_edura/tooltip-comp"
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector"
import TdImageAbsen from "~/controllers/absensi-controllers/tabel-absen/comp-td-image"
import ThSettingKalendar from "~/controllers/absensi-controllers/tabel-absen/comp-th-modal"
import { LockKeyhole, LockKeyholeOpen } from "lucide-react"
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif"
import TdModalEditPotoProfilSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-poto-siswa"
import TdModalEditDataSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-data-siswa"

export default function AbsensiSiswaBulananPage() {
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value)
    const {value} = useFilterContext();
    const isSabtuLibur = value?.sabtuLibur; 
    const tgl = value?.bulan ?? new Date();
    const [kunciKolom, setKunciKolom] = useState<boolean>(false);
    
    const data = useMemo(()=>{
        return ormAbsen.dataAbsenInThisMonth(tgl, isSabtuLibur).filter(s=>s.exist_in_this_month)
    }, [ormAbsen, value?.sabtuLibur, value?.bulan]);

    const kalendar = useMemo(()=>{
        return ormAbsen.ormKaldik.arrayDateInMonth(tgl??new Date(), isSabtuLibur)
    },[ormAbsen, value?.sabtuLibur, value?.bulan]);
;
    const totalHE = kalendar.filter(s=>s.isHe).length;
    
    return (
        <div className="p-1">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">DAFTAR HADIR</h3>
            <h4 className="text-2xl text-center font-extrabold uppercase mb-0">MURID KELAS {rombel}</h4>
            <h5 className="text-2xl text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})} Semester {tgl?.getMonth()>5?1:2}</h5>
            <p className="text-xl font-extrabold mb-1">Bulan {tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}</p>
            <TableWithScrolling className="text-10px">
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <THEduraFreeze stateFreeze={kunciKolom} rowSpan={2} className="select-none">
                            <span>
                                nama
                            </span>
                            <p className="print:hidden capitalize text-[8px]">Klik Nama untuk mengedit</p>
                            <TooltipComp content={kunciKolom?"Buka Kunci Kolom":"Kunci kolom"}>
                                <label className="absolute top-1 right-1 print:hidden has-checked:bg-green-300">
                                    <input type="checkbox" checked={kunciKolom} onChange={(e)=>setKunciKolom(e.target.checked)} className="hidden"/>
                                    {
                                        kunciKolom?(
                                            <LockKeyhole size={16}/>
                                        ):(
                                            <LockKeyholeOpen size={16}/>
                                        )
                                    }
                                </label>
                            </TooltipComp>
                        </THEduraFreeze>
                        <ThEdura 
                            className="select-none"
                            colSpan={kalendar.length}
                            >
                                Bulan {tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}
                        </ThEdura>
                        <TooltipComp content={`Jumlah Hari Efektif (HE)= ${totalHE} hari`}>
                            <ThEdura colSpan={4} className="text-wrap">Jumlah (HE: {totalHE})</ThEdura>
                        </TooltipComp>
                    </TRowEdura>
                    <TRowEdura>
                        {
                            kalendar.map(({tgl, date, isLibur, eventYet, keteranganKaldik, style})=>(
                                <ThSettingKalendar 
                                    key={tgl} 
                                    tgl={tgl} 
                                    date={date} 
                                    isLibur={isLibur} 
                                    eventYet={eventYet} 
                                    keteranganKaldik={keteranganKaldik} 
                                    style={style}
                                    ormKaldik={ormAbsen.ormKaldik}
                                />
                                
                            ))
                        }
                        <ThEdura>Hadir</ThEdura>
                        <ThEdura>Sakit</ThEdura>
                        <ThEdura>Ijin</ThEdura>
                        <ThEdura>Alpa</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        data.map(({pd_nama, id, dataAbsen, status, check_out, total_hadir, total_alpa, total_sakit, total_ijin, koleksi_potoinduk},index)=>(
                            <TRowEdura key={index} className={status.toLowerCase() !=='aktif'?"bg-yellow-200":""}>
                                <TdEdura className="align-middle">{index+1}</TdEdura>
                                {
                                    status !=='aktif'? (
                                            <TdModalEditDataSiswa 
                                                kunciKolom={kunciKolom}
                                                id={id}
                                                className="bg-yellow-200 uppercase"
                                                pd_nama={pd_nama}
                                            />
                                    ):(
                                        <TdModalEditPotoProfilSiswa 
                                            kunciKolom={kunciKolom}
                                            id={id}
                                            className={`${(index % 2 ? 'bg-white' : 'bg-zinc-100')} uppercase`}
                                            pd_nama={pd_nama}
                                            />
                                    )
                                }
                                {
                                    dataAbsen.map(({kehadiran,tgl,date,idbaris_absen,id_image_kehadiran, style, isLibur, eventYet})=>(
                                        <TdImageAbsen key={tgl}
                                            templateAbsen={ormAbsen.absenTemplate}
                                            fokusTglAbsen={date}
                                            tokenSiswa = {id} 
                                            kehadiran={kehadiran}
                                            refIdSheetAbsen={idbaris_absen}
                                            style={style}
                                            idImg={id_image_kehadiran}
                                            profile={koleksi_potoinduk}
                                            mode={value?.modeTampilanAbsen?.name}
                                        />
                                    ))
                                }
                                <TdEdura className="text-center align-middle">{total_hadir}</TdEdura>
                                <TdEdura className="text-center align-middle">{total_sakit}</TdEdura>
                                <TdEdura className="text-center align-middle">{total_ijin}</TdEdura>
                                <TdEdura className="text-center align-middle">{total_alpa}</TdEdura>
                            </TRowEdura>
                        ))
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}