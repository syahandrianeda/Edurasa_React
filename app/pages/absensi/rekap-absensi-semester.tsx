import { useMemo, useState } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook"
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";
import TdModalEditDataSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-data-siswa";
import TdModalEditPotoProfilSiswa from "~/controllers/absensi-controllers/tabel-absen/comp-td-edit-poto-siswa";
import { currentTapel } from "~/lib/current-tapel";

export default function RekapAbsensiSiswaSemesterPage(){
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const [kunciKolom] = useState<boolean>(false);
    const {value} = useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur; 
    const tgl = value?.bulan ?? new Date();
    const semester = useMemo(()=>tgl.getMonth()>5?1:2,[value?.bulan])
    const data = useMemo(()=>{
            return ormAbsen.dataAbsenOnThisSemester (semester, isSabtuLibur);
        }, [ormAbsen, isSabtuLibur, value?.bulan,rombel]);
    const countHEByMonth = useMemo(()=>{
        return ormAbsen.ormKaldik.getKaldikSemester(semester,isSabtuLibur).totalPropertiHari.total;
    },[
        ormAbsen, tgl, isSabtuLibur
    ]);
    
    return (
        <div className="p-1">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Rekapitulasi Kehadiran Per Semester</h3>
            <h4 className="text-2xl text-center font-extrabold uppercase mb-0">murid kelas {rombel}</h4>
            <h5 className="text-2xl text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})} Semester {tgl?.getMonth()>5?1:2}</h5>
            
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura rowSpan={2}>Nama</ThEdura>
                        <ThEdura colSpan={4}>Kehadiran</ThEdura>
                        <ThEdura colSpan={2}>Hari Efektif</ThEdura>
                        <ThEdura rowSpan={2} className="text-nowrap">% Kehadiran</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <ThEdura>Hadir</ThEdura>
                        <ThEdura>Sakit</ThEdura>
                        <ThEdura>Ijin</ThEdura>
                        <ThEdura>Alpa</ThEdura>
                        <ThEdura>Berjalan</ThEdura>
                        <ThEdura>Semester</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        data.map(({status,id,pd_nama, total_hadir, total_alpa, total_sakit, total_ijin,count_hari_efektif, persentase_kehadiran, persentase_absensi},index)=>(
                            <TRowEdura key={index}>
                                <TdEdura>{index+1}</TdEdura>
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
                                <TdEdura data-content-type="number" className="text-center">{total_hadir}</TdEdura>
                                <TdEdura data-content-type="number" className="text-center">{total_sakit}</TdEdura>
                                <TdEdura data-content-type="number" className="text-center">{total_ijin}</TdEdura>
                                <TdEdura data-content-type="number" className="text-center">{total_alpa}</TdEdura>
                                <TdEdura data-content-type="number" className="text-center">{count_hari_efektif}</TdEdura>
                                <TdEdura data-content-type="number" className="text-center">{countHEByMonth}</TdEdura>
                                <TdEdura className="text-end">{persentase_kehadiran}</TdEdura>
                            </TRowEdura>
                        ))
                    }
                </tbody>
            </TableWithScrolling>
        </div>

    )
}