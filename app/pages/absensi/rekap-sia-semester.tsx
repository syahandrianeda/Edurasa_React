import { useMemo, useState } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";
import { currentTapel } from "~/lib/current-tapel";

export default function RekapSiaSemesterPage(){
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const [kunciKolom, setKunciKolom] = useState<boolean>(false);
    const {value} = useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur; 
    const tgl = value?.bulan ?? new Date();
    const semester = useMemo(()=>tgl.getMonth()>5?1:2,[tgl])
    const data = useMemo(()=>{
            return ormAbsen.rekapSIAPerSemester(semester, isSabtuLibur);
        }, [ormAbsen, isSabtuLibur, tgl ,rombel]);
    
    
    return (
            <div className="p-1">
                <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Rekapitulasi SIA (Sakit, Ijin, Alpa)</h3>
                <h4 className="text-2xl text-center font-extrabold uppercase mb-0">murid kelas {rombel}</h4>
                <h5 className="text-2xl text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})} Semester {tgl?.getMonth()>5?1:2}</h5>
                <TableWithScrolling>
                    <thead>
                        <TRowEdura>
                            <ThEdura rowSpan={2}>No</ThEdura>
                            <ThEdura rowSpan={2}>Bulan</ThEdura>
                            <ThEdura rowSpan={2}>Hari Efektif</ThEdura>
                            <ThEdura colSpan={2}>Kehadiran</ThEdura>
                            <ThEdura colSpan={4}>Absensi</ThEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <ThEdura>Hadir</ThEdura>
                            <ThEdura>%</ThEdura>
                            <ThEdura>Sakit</ThEdura>
                            <ThEdura>Ijin</ThEdura>
                            <ThEdura>Alpa</ThEdura>
                            <ThEdura>%</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            data.map(({namaBulan, totalSakit, totalIjin, totalAlpa,totalHE,totalHadir,persenHadir, persenSIA},index)=>(
                                <TRowEdura key={namaBulan}>
                                    <TdEdura className="w-5">{index+1}</TdEdura>
                                    <TdEdura>{namaBulan}</TdEdura>
                                    <TdEdura className="text-center">{totalHE}</TdEdura>
                                    <TdEdura className="text-center">{totalHadir}</TdEdura>
                                    <TdEdura className="text-center">{persenHadir}</TdEdura>
                                    <TdEdura className="text-center">{totalSakit}</TdEdura>
                                    <TdEdura className="text-center">{totalIjin}</TdEdura>
                                    <TdEdura className="text-center">{totalAlpa}</TdEdura>
                                    <TdEdura className="text-center">{persenSIA}</TdEdura>
                                </TRowEdura>
                            ))
                        }
                    </tbody>
                </TableWithScrolling>
            </div>
        )
}