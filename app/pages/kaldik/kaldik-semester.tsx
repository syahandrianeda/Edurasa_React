import {  useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { ViewKaldik } from "~/controllers/kaldik-controller/tabel/view-kaldik";
import { IDENTITAS_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import { currentTapel } from "~/lib/current-tapel";

export default function KaldikSemesterPage({semester}:{semester:number}){
    const ormKaldik = useAppSelector(instanceOfKaldik);
    const {value}= useFilterContext();
    const isSabtuLibur= useAppSelector(state=>state.uiPreference.sabtuLibur);// value?.sabtuLibur;
    const isBottomKeterangan = value?.isBottomKalendar;
    const includingHariEfektif = value?.includingHariEfektif;

    
    const {includeKeterangan:dataKaldikSemester, dataKeterangan,dataPropertiHari, totalPropertiHari, totalPropertiHariBelajar} = useMemo(() => {
        return ormKaldik.getKaldikSemester(semester,isSabtuLibur)
    }, [ormKaldik, isSabtuLibur]);
    
    return (
        <div className="p-1" data-word="img">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Kalender Pendidikan</h3>
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">{IDENTITAS_SEKOLAH}</h3>
            <h3 className="text-xl text-center font-extrabold mb-5">{currentTapel({variant:'full'})} Semester {semester}</h3>
            <ViewKaldik 
                dataKaldikSemester={dataKaldikSemester}
                semester={'Semester '+semester.toString()}
                isSabtuLibur={isSabtuLibur}
                isBottomKeterangan={isBottomKeterangan}
                includingHariEfektif={includingHariEfektif}
                dataKeterangan={dataKeterangan}
                dataPropertiHari={dataPropertiHari}
                totalPropertiHari={totalPropertiHari}
                totalPropertiHariBelajar={totalPropertiHariBelajar}
                />
            
        </div>
    )
};