import {  useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { TableHariEfektif } from "~/controllers/kaldik-controller/tabel/tabel-hari-efektif";
import { IDENTITAS_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import { currentTapel } from "~/lib/current-tapel";

export default function KaldikHariEfektif({semester}:{semester:number}){
    const ormKaldik = useAppSelector(instanceOfKaldik);
    const {value}= useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur;
    const modePartSemester = value?.kaldikSatuTahun;

    const {includeKeterangan:dataKaldikSemester, dataKeterangan,dataPropertiHari, totalPropertiHari, totalPropertiHariBelajar} = useMemo(() => {
        return ormKaldik.getKaldikSemester(semester,isSabtuLibur)
    }, [ormKaldik, isSabtuLibur]);

    const {
        includeKeterangan:dataKaldikSemester3, 
        dataKeterangan:dataKeterangan3,
        dataPropertiHari:dataPropertiHari3, 
        totalPropertiHari:totalPropertiHari3, 
        totalPropertiHariBelajar:totalPropertiHariBelajar3
    } = useMemo(() => {
        return ormKaldik.getKaldikOneTapel(isSabtuLibur)
    }, [ormKaldik, isSabtuLibur]);

    return (
        <div className="p-1">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Jumlah Hari Efektif</h3>
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">{IDENTITAS_SEKOLAH}</h3>
            {
                modePartSemester?(
                    <>
                            <h3 className="text-xl text-center font-extrabold mb-5">{currentTapel({variant:'full'})}</h3>
                            <TableHariEfektif sizeNormal={true} dataTotal={totalPropertiHari3} caption="Jumlah Hari Efektif" data={dataPropertiHari3} sabtuLibur={isSabtuLibur as boolean} isHeb={false}/>
                    </>
                    ):(
                    <>
                        <h3 className="text-xl text-center font-extrabold mb-5">{currentTapel({variant:'full'})} Semester {semester}</h3>
                        <TableHariEfektif sizeNormal={true} dataTotal={totalPropertiHari} caption="Jumlah Hari Efektif" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean} isHeb={false}/>
                    </>
                )
            }                       
        </div>
    )
};