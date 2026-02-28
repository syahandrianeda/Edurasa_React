import {  useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { ViewKaldik } from "~/controllers/kaldik-controller/tabel/view-kaldik";
import { IDENTITAS_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import { currentTapel } from "~/lib/current-tapel";

export default function KaldikTahunanPage(){
    const ormKaldik = useAppSelector(instanceOfKaldik);
    const {value}= useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur;
    const isBottomKeterangan = value?.isBottomKalendar;
    const includingHariEfektif = value?.includingHariEfektif;
    const modePartSemester = value?.kaldikSatuTahun;

    
    const {
        includeKeterangan:dataKaldikSemester1, 
        dataKeterangan:dataKeterangan1,
        dataPropertiHari:dataPropertiHari1, 
        totalPropertiHari:totalPropertiHari1, 
        totalPropertiHariBelajar:totalPropertiHariBelajar1
    } = useMemo(() => {
        return ormKaldik.getKaldikSemester(1,isSabtuLibur)
    }, [ormKaldik, isSabtuLibur]);

    const {
        includeKeterangan:dataKaldikSemester2, 
        dataKeterangan:dataKeterangan2,
        dataPropertiHari:dataPropertiHari2, 
        totalPropertiHari:totalPropertiHari2, 
        totalPropertiHariBelajar:totalPropertiHariBelajar2
    } = useMemo(() => {
        return ormKaldik.getKaldikSemester(2,isSabtuLibur)
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
        <div className="p-1" data-word="img">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Kalender Pendidikan</h3>
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">{IDENTITAS_SEKOLAH}</h3>
            <h3 className="text-xl text-center font-extrabold mb-5">{currentTapel({variant:'full'})}</h3>
            {
                modePartSemester?(
                    <ViewKaldik 
                        dataKaldikSemester={dataKaldikSemester3}
                        semester=''
                        isSabtuLibur={isSabtuLibur}
                        isBottomKeterangan={isBottomKeterangan}
                        includingHariEfektif={includingHariEfektif}
                        dataKeterangan={dataKeterangan3}
                        dataPropertiHari={dataPropertiHari3}
                        totalPropertiHari={totalPropertiHari3}
                        totalPropertiHariBelajar={totalPropertiHariBelajar3}
                        />
                ):(
                    <>
                        <h4 className="text-xl text-center bg-sky-300 font-extrabold mt-4 mb-1"> Semester 1</h4>
                        <ViewKaldik 
                            dataKaldikSemester={dataKaldikSemester1}
                            semester='Semester 1'
                            isSabtuLibur={isSabtuLibur}
                            isBottomKeterangan={isBottomKeterangan}
                            includingHariEfektif={includingHariEfektif}
                            dataKeterangan={dataKeterangan1}
                            dataPropertiHari={dataPropertiHari1}
                            totalPropertiHari={totalPropertiHari1}
                            totalPropertiHariBelajar={totalPropertiHariBelajar1}
                            />
                        <h4 className="text-xl text-center bg-sky-300 font-extrabold mt-4 mb-1 break-all">  Semester 2</h4>
                        <ViewKaldik 
                            dataKaldikSemester={dataKaldikSemester2}
                            semester='Semester 2'
                            isSabtuLibur={isSabtuLibur}
                            isBottomKeterangan={isBottomKeterangan}
                            includingHariEfektif={includingHariEfektif}
                            dataKeterangan={dataKeterangan2}
                            dataPropertiHari={dataPropertiHari2}
                            totalPropertiHari={totalPropertiHari2}
                            totalPropertiHariBelajar={totalPropertiHariBelajar2}
                            />
                    </>
                )
            }
            
            
        </div>
    )
}
