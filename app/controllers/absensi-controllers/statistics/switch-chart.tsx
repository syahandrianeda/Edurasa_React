
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import type { statistikRekap } from "~/domain/absensi/orm-absensi-type"
import StatisticBarSIAChart from "./statistic-bar-sia";
import StatisticBarSIAPlusChart from "./statistic-bar-siaplus";
import StatisticPieSIAChart from "./statistic-pie-sia";
import StatisticPieSIAPlusChart from "./statistic-pie-siaplus";
import StatisticDoughnutSIAPlusChart from "./statistic-doughnut-siaplus";
import StatisticDoughnutSIAChart from "./statistic-doughnut-sia";

export default function SwitchChart(
    {
        tgl,
        data,
    }:{
        tgl:Date,
        data:statistikRekap,
    }){
        const {value} = useFilterContext();
        const modeChart = value?.modeTampilanChart?.name
        const modeSia = value?.modeTampilanAbsenStatistik?.name
        if(modeSia === 'sia'){
            if(modeChart === 'bar'){
                return <StatisticBarSIAChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
            }
            if(modeChart === 'pie'){
                return <StatisticPieSIAChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
            }
            if(modeChart === 'doughnut'){
                    return <StatisticDoughnutSIAChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
                
            }
        }
        
        if(modeSia === 'siaplus'){
            if(modeChart === 'bar'){
                return <StatisticBarSIAPlusChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
            }
            if(modeChart === 'pie'){
                return <StatisticPieSIAPlusChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
            }
            if(modeChart === 'doughnut'){
                return <StatisticDoughnutSIAPlusChart title={`Bulan ${tgl?.toLocaleString('id-ID',{month:'long', year:'numeric'})}`} dataRefrence={data} />
                
            }
        }
    return  (
                <p>Not Found {modeSia}/{modeChart}</p>
            )
}