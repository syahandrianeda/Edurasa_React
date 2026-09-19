import { useMemo, useState } from "react"
import { TdEdura,  ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components"
import TableWithScrolling from "~/components/tabels/table-with-scrolling"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { useAppSelector } from "~/context-reduct/hook"
import { currentTapel } from "~/lib/current-tapel"
import TooltipComp from "~/components/ui_edura/tooltip-comp"
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector"
import TdImageAbsen from "~/controllers/absensi-controllers/tabel-absen/comp-td-image"
import ThSettingKalendar from "~/controllers/absensi-controllers/tabel-absen/comp-th-modal"
import { LockKeyhole, LockKeyholeOpen } from "lucide-react"
import TdModalEditPotoProfilSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-poto-siswa"
import TdModalEditDataSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-data-siswa"


export default function AbsensiSiswaBulananPage() {
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const {value} = useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur??true; 
    const today = useMemo(() => new Date(), []);
    const tgl = value?.bulan ?? today;
    const [kunciKolom, setKunciKolom] = useState<boolean>(false);
    const data = useMemo(()=>{
        return ormAbsen.dataAbsenInThisMonth(tgl, isSabtuLibur).filter(s=>s.exist_in_this_month)
    }, [ormAbsen, isSabtuLibur, tgl]);
    // console.log({data})
    const rekapData = useMemo(()=>{
        return ormAbsen.rekapSIAPerDateCurrentMonth(data);
    },[data])
    
    const kalendar = useMemo(()=>{
        return ormAbsen.ormKaldik.arrayDateInMonth(tgl, isSabtuLibur)
    },[ormAbsen, isSabtuLibur, tgl]);

    const keteranganKaldik = useMemo(()=>{
        return ormAbsen.ormKaldik.KeteranganInMonth(tgl)
    },[tgl, ormAbsen]);

    const statistik = useMemo(() => {
            return ormAbsen.getStatistikBulanan(tgl,isSabtuLibur)

        }, [ormAbsen, tgl, isSabtuLibur]);

    const { totalHE, totalSIA, totalHadir, persenSIA, persenHadir } = statistik;

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
                                Nama
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
                                {
                                    `
                                    Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}
                                    `
                                }
                        </ThEdura>
                        <TooltipComp content={`Jumlah Hari Efektif (HE)= ${totalHE} hari`}>
                            <ThEdura colSpan={4} className="text-wrap">{`Jumlah (HE: ${totalHE})`}</ThEdura>
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
                                <TdEdura className="align-middle" data-content-type="number">{index+1}</TdEdura>
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
                                <TdEdura className="text-center align-middle" data-content-type="number">{total_hadir}</TdEdura>
                                <TdEdura className="text-center align-middle" data-content-type="number">{total_sakit}</TdEdura>
                                <TdEdura className="text-center align-middle" data-content-type="number">{total_ijin}</TdEdura>
                                <TdEdura className="text-center align-middle" data-content-type="number">{total_alpa}</TdEdura>
                            </TRowEdura>
                        ))
                    }
                </tbody>
                <tfoot className="print:table-row-group">
                    {
                        rekapData.map(({kehadiran,data},index)=>(
                            <TRowEdura key={index}>
                                <ThEdura className="border-e-0"/>
                                <THEduraFreeze data-content-type="string"
                                    stateFreeze={kunciKolom} 
                                    className="border-s-0">
                                        {
                                        `Total ${kehadiran}`
                                        }
                                    
                                    </THEduraFreeze>
                                {
                                    data.map(({tgl,count},x)=>(
                                        <ThEdura key={x} data-content-type="number">{count?count:''}</ThEdura>
                                    ))
                                }
                                <ThEdura data-content-type="number">{kehadiran === 'Hadir'?data.map(m=>m.count).reduce((a,b)=>a+b):''}</ThEdura>
                                <ThEdura data-content-type="number">{kehadiran === 'Sakit'?data.map(m=>m.count).reduce((a,b)=>a+b):''}</ThEdura>
                                <ThEdura data-content-type="number">{kehadiran === 'Ijin'?data.map(m=>m.count).reduce((a,b)=>a+b):''}</ThEdura>
                                <ThEdura data-content-type="number">{kehadiran === 'Alpa'?data.map(m=>m.count).reduce((a,b)=>a+b):''}</ThEdura>
                            </TRowEdura>
                        ))
                    }
                </tfoot>
            </TableWithScrolling>
            <div className="flex gap-2 mt-5 text-[10px] overflow-x-auto" data-word="img">
                <div className="w-full">
                    <span className="font-bold">
                        Keterangan: 
                    </span>
                    <ul className="list-outside">
                        {
                            keteranganKaldik.map(({keterangan, labelTanggal, warnaLatar, warnaHuruf},index)=>(
                                <li className="flex justify-between gap-2 border-b-2 border-dashed" key={index}>
                                    <div className="truncate">{keterangan}</div>
                                    <div className="text-nowrap" style={{background:warnaLatar, color: warnaHuruf   }}>{labelTanggal}</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-full flex flex-col justify-center gap-3 px-1">
                    <div className="flex">
                        <div className="flex items-center gap-2 w-full">
                            <div className="text-nowrap">% Absensi = </div>
                            <div className="flex flex-col justify-center w-fit">
                                <div className="border-b border-black text-center">Jumlah Sakit, Alpa, Ijin</div>
                                <div className="text-nowrap">Jumlah Murid x Jumlah Hari Efektif</div>
                            </div>
                            <div className="text-nowrap"> x 100% = </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex flex-col justify-center w-fit">
                                <div className="border-b border-black text-center">
                                    {
                                        totalSIA

                                    }
                                </div>
                                <div>{data.length} x {totalHE}</div>
                            </div>
                            <span>x 100% = {persenSIA}</span>
                        </div>
                    </div>
                    <div className="flex border-t-2">
                        <div className="flex items-center gap-2 w-full">
                            <div className="text-nowrap">% Kehadiran = </div>
                            <div className="flex flex-col justify-center w-fit">
                                <div className="border-b border-black text-center">Jumlah Hadir</div>
                                <div className="text-nowrap">Jumlah Murid x Jumlah Hari Efektif</div>
                            </div>
                            <div className="text-nowrap"> x 100% = </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex flex-col justify-center w-fit">
                                <div className="border-b border-black text-center">
                                    {
                                        totalHadir
                                    }
                                </div>
                                <div>{data.length} x {totalHE}</div>
                            </div>
                            <span>x 100% = {persenHadir}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}