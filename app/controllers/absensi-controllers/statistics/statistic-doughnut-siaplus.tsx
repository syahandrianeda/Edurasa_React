import type { BarControllerChartOptions, ChartData, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from "chart.js";
import type { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";
import { useMemo } from "react";
import { BarChart, defaultOptionBarChart, DoughnutChart, PieChart } from "~/components/charts/bar-chart";
import type { statistikRekap } from "~/domain/absensi/orm-absensi-type";
import colors from 'tailwindcss/colors'

const defaultOptionPieChart:_DeepPartialObject<CoreChartOptions<"doughnut"> & ElementChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & ScaleChartOptions<'pie'> & DoughnutControllerChartOptions> = {
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
            },
            maxHeight:50
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
        
    },
    
}

export default function StatisticDoughnutSIAPlusChart({
        title,
        dataRefrence
    }:{
        title:string,
        dataRefrence:statistikRekap
    }){

    const opt:_DeepPartialObject<CoreChartOptions<"doughnut"> & ElementChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & ScaleChartOptions<'pie'> & DoughnutControllerChartOptions> = useMemo(()=>
    (
        { ...defaultOptionPieChart, 
            plugins: {
                ...defaultOptionPieChart.plugins,
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
                                return dataRefrence.totalSakit>0?dataRefrence.persenSakit:'';
                            case 'Ijin':
                                return dataRefrence.totalIjin>0?dataRefrence.persenIjin:'';
                            case 'Alpa':
                                return dataRefrence.totalAlpa>0?dataRefrence.persenAlpa:'';
                            case 'Sakit, Ijin, Alpa':
                                return dataRefrence.persenSIA;
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
    const data:ChartData<"doughnut", unknown, unknown>=useMemo(()=>(
        {
            labels:['Hadir','Sakit, Ijin, Alpa'],
            datasets:[
                {
                    label:'#Total: ',
                    data: [
                            dataRefrence.totalHadir,
                            dataRefrence.totalSIA,
                        ],
                    backgroundColor:[
                        colors.sky[300],
                        colors.rose[300],
                    ],
                    borderWidth:1,
                    radius:'80%'
                },
            ],
        }
    )
        ,[dataRefrence]);
    
    return <DoughnutChart key={title} data={data} options={opt} updateMode='show'/>
}