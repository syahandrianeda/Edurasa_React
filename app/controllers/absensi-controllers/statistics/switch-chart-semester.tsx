import StatisticBarChart from "~/components/charts/bar-chart"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import type { statistikRekap } from "~/domain/absensi/orm-absensi-type"
import StatisticBarSIAChart from "./statistic-bar-sia";
import StatisticBarSIAPlusChart from "./statistic-bar-siaplus";
import StatisticPieSIAChart from "./statistic-pie-sia";
import StatisticPieSIAPlusChart from "./statistic-pie-siaplus";
import StatisticDoughnutSIAPlusChart from "./statistic-doughnut-siaplus";
import StatisticDoughnutSIAChart from "./statistic-doughnut-sia";
import StatisticBarSIAChartSemester from "./statistic-bar-sia-semester";

export default function SwitchChartSemester(
    {
        tgl,
        dataSemester,
    }:{
        tgl:Date,
        dataSemester:statistikRekap[],
    }){
        const {value} = useFilterContext();
        const modeChart = value?.modeTampilanChart?.name
        const modeSia = value?.modeTampilanAbsenStatistik?.name;
        
        if(modeSia === 'sia'){
            if(modeChart === 'bar'){
                return <StatisticBarSIAChartSemester title={`Semester ${tgl.getMonth()>5?1:2}`} dataRefrence={dataSemester} />
            }
            if(modeChart === 'pie'){
                return (
                        <div className="grid grid-cols-3 border">
                            
                            {
                                dataSemester.map((dataItem,index)=>(
                                    <div className="w-fit text-start">
                                        <StatisticPieSIAChart title={`Bulan ${dataItem.dateRefrence?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={dataItem} />
                                    </div>

                                ))
                            }
                        </div>

                    )
            }
            if(modeChart === 'doughnut'){
                return (
                    <div className="grid grid-cols-3">
                        {
                            dataSemester.map((dataItem,index)=>(
                                <div className="w-fit text-start">
                                    <StatisticDoughnutSIAChart key={index} title={`Bulan ${dataItem.dateRefrence?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={dataItem} />
                                </div>
                            ))
                        }
                    </div>
                    )
            }
        }
        
        if(modeSia === 'siaplus'){
            if(modeChart === 'bar'){
                return <StatisticBarSIAChartSemester title={`Semester ${tgl.getMonth()>5?1:2}`} dataRefrence={dataSemester} />
            }
            if(modeChart === 'pie'){
                return (
                    <div className="grid grid-cols-3">
                        {
                            dataSemester.map((dataItem,index)=>(
                                <div className="w-fit text-start">
                                    <StatisticPieSIAPlusChart key={index} title={`Bulan ${dataItem.dateRefrence?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={dataItem} />
                                </div>

                            ))
                        }
                    </div>
                    )
                }
            if(modeChart === 'doughnut'){
                return (
                    <div className="grid grid-cols-3">
                        {
                            dataSemester.map((dataItem,index)=>(
                                <div className="w-fit text-start">
                                    <StatisticDoughnutSIAPlusChart key={index} title={`Bulan ${dataItem.dateRefrence?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={dataItem} />
                                </div>
                            ))
                        }
                    </div>
                    )
            }
        }
    return  (
                <p>Not Found {modeSia}/{modeChart}</p>
            )
}