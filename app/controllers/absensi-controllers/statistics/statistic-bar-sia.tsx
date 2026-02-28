import type { BarControllerChartOptions, ChartData, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from "chart.js";
import type { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";
import { useMemo } from "react";
import { BarChart, defaultOptionBarChart } from "~/components/charts/bar-chart";
import type { statistikRekap } from "~/domain/absensi/orm-absensi-type";
import colors from 'tailwindcss/colors';

export default function StatisticBarSIAChart({
        title,
        dataRefrence
    }:{
        title:string,
        dataRefrence:statistikRekap
    }){

    const opt:_DeepPartialObject<CoreChartOptions<"bar"> & 
            ElementChartOptions<"bar"> & 
            PluginChartOptions<"bar"> & 
            DatasetChartOptions<"bar"> & 
            ScaleChartOptions<"bar"> & 
            BarControllerChartOptions> = useMemo(()=>
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
                    align: 'top',
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
                    backgroundColor:[
                        colors.yellow[300],
                        colors.green[200],
                        colors.rose[300],
                    ],
                    borderWidth:1,
                },
            ]
        }
    )
        ,[dataRefrence]);
    
    return <BarChart key={title} options={opt} data={data} updateMode='show'/>
}