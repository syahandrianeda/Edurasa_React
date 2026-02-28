import { useMemo, type ComponentProps } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type CoreChartOptions,
    type ElementChartOptions,
    type PluginChartOptions,
    type DatasetChartOptions,
    type ScaleChartOptions,
    type BarControllerChartOptions,
    type ChartData,
    ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import type { _DeepPartialObject } from 'node_modules/chart.js/dist/types/utils';
import type { statistikRekap } from '~/domain/absensi/orm-absensi-type';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  ChartDataLabels
);

export const defaultOptionBarChart:_DeepPartialObject<CoreChartOptions<"bar"> & ElementChartOptions<"bar"> & PluginChartOptions<"bar"> & DatasetChartOptions<"bar"> & ScaleChartOptions<"bar"> & BarControllerChartOptions> = {
    responsive: true,
    plugins: {
        legend: {
            // display:false,
            position: 'top' as const,
            labels: {
                generateLabels: (chart) => {
                    const { data } = chart;

                    if (data.labels && data.datasets.length) {
                    return data.labels.map((label, i) => ({
                        text: label as string,
                        fillStyle: (data.datasets[0].backgroundColor as string[])[i],
                        strokeStyle: (data.datasets[0].backgroundColor as string[])[i],
                        index: i
                    }));
                    }
                    return [];
                }
            }
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
        
    },
}

export function BarChart({options, data,...props}:ComponentProps<typeof Bar>){
    
    return (
        <Bar
        options={options}
        data={data}
        {...props}
        />
    )
}
export function PieChart({options, data,...props}:ComponentProps<typeof Pie>){
    
    return (
        <Pie
        options={options}
        data={data}
        {...props}
        />
    )
}
export function DoughnutChart({options, data,...props}:ComponentProps<typeof Doughnut>){
    
    return (
        <Doughnut
        options={options}
        data={data}
        {...props}
        />
    )
}
export default function StatisticBarChart({
        title,
        dataRefrence
    }:{
        title:string,
        dataRefrence:statistikRekap
    }){

    const opt:_DeepPartialObject<CoreChartOptions<"bar"> & ElementChartOptions<"bar"> & PluginChartOptions<"bar"> & DatasetChartOptions<"bar"> & ScaleChartOptions<"bar"> & BarControllerChartOptions> = useMemo(()=>
    (
        { ...defaultOptionBarChart, 
            plugins: {
                ...defaultOptionBarChart.plugins,
                title: {
                    display: true,
                    text: title,
                    
                },
                datalabels: {
                    anchor: 'end',
                    align: 'start',
                    // formatter: (value: number) => value,
                    formatter: (value: number, context) => {
                        const label = context.chart.data.labels?.[context.dataIndex];

                        switch (label) {
                        case 'Sakit':
                            return dataRefrence.persenSakit;
                        case 'Ijin':
                            return dataRefrence.persenIjin;
                        case 'Alpa':
                            return dataRefrence.persenAlpa;
                        default:
                            return value;
                        }
                    },
                    font: {
                        weight: 'bold',
                    },
                    color:'#000',
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    padding: 4,
                }
            },
            
        }
            

    ),[title]) ;
    const data:ChartData<"bar", unknown, unknown>=useMemo(()=>(
        {
            labels:['Sakit','Ijin', 'Alpa'],
            datasets:[
                {
                    label:'#Total: ',
                    data: [
                            dataRefrence.totalSakit,
                            dataRefrence.totalIjin,
                            dataRefrence.totalAlpa
                        ],
                    backgroundColor:['yellow','green','red'],
                    borderWidth:1,
                },
            ]
        }
    )
        ,[dataRefrence]);
    
    return <BarChart key={title} options={opt} data={data} updateMode='show'/>
}