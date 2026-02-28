import { useMemo} from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";
import SwitchChart from "~/controllers/absensi-controllers/statistics/switch-chart";
import SwitchChartSemester from "~/controllers/absensi-controllers/statistics/switch-chart-semester";
import { currentTapel } from "~/lib/current-tapel";

export default function StatistikAbsensiSemesterPage(){
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const {value} = useFilterContext();
    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);// value?.sabtuLibur; 
    const tgl = value?.bulan ?? new Date();
    const semester = useMemo(()=>tgl.getMonth()>5?1:2,[tgl])
    const data = useMemo(()=>{
            return  ormAbsen.rekapSIAPerSemester(semester, isSabtuLibur);//.filter(s=>s.exist_in_this_month);
        }, 
        [ormAbsen, isSabtuLibur, value?.bulan,rombel]
    );

    return (
            <div className="p-1" data-word="img">
                <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Statistik Presensi Murid Semester {tgl?.getMonth()>5?1:2}</h3>
                <h4 className="text-2xl text-center font-extrabold uppercase mb-0">murid kelas {rombel}</h4>
                <h5 className="text-2xl text-center font-extrabold uppercase mb-7">{currentTapel({variant:'full'})} </h5>
                
                <SwitchChartSemester
                    tgl={tgl}
                    dataSemester={data}
                    />
            </div>
    )
}