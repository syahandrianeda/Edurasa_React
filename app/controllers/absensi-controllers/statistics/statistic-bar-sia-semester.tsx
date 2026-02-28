import type { BarControllerChartOptions, Chart, ChartData, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from "chart.js";
import type { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";
import { useMemo } from "react";
import { BarChart, defaultOptionBarChart } from "~/components/charts/bar-chart";
import type { statistikRekap } from "~/domain/absensi/orm-absensi-type";
import colors from 'tailwindcss/colors';

export default function StatisticBarSIAChartSemester({
        title,
        dataRefrence
    }:{
        title:string,
        dataRefrence:statistikRekap[]
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
                legend:{
                    labels: {
                        generateLabels: (chart: Chart<"bar">) => {
                            const { data } = chart;
                            console.log(data.datasets.map(m=>m.backgroundColor))
                            if (data.labels && data.datasets.length) {
                                return [
                                    {
                                        text: 'Sakit',
                                        fillStyle:  colors.yellow[300],
                                        strokeStyle:  colors.yellow[300],
                                        index: 0
                                    },
                                    {
                                        text: 'Ijin',
                                        fillStyle:  colors.green[300],
                                        strokeStyle:  colors.green[300],
                                        index: 1
                                    },
                                    {
                                        text: 'Alpa',
                                        fillStyle:  colors.rose[300],
                                        strokeStyle:  colors.rose[300],
                                        index: 2
                                    }
                                ]
                            }
                            return [];
                        }
                    },

                },
                title: {
                    display: true,
                    text: title,
                    
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    // formatter: (value: number) => value,
                    formatter: (value: number, context) => {
                        const bulanIndex = context.dataIndex;
                        const datasetIndex = context.datasetIndex;

                        const bulan = dataRefrence[bulanIndex];

                        switch (datasetIndex) {
                            case 0: return bulan.totalSakit>0?bulan.persenSakit:'';
                            case 1: return bulan.totalIjin>0?bulan.persenIjin:'';
                            case 2: return bulan.totalAlpa>0?bulan.persenAlpa:'';
                            default: return value;
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
    const data:ChartData<"bar", unknown, unknown>=useMemo(()=>({
            labels: dataRefrence.map(item => item.namaBulan),

            datasets: [
                {
                label: 'Sakit',
                data: dataRefrence.map(item => item.totalSakit),
                backgroundColor: colors.yellow[300],
                },
                {
                label: 'Ijin',
                data: dataRefrence.map(item => item.totalIjin),
                backgroundColor: colors.green[300],
                },
                {
                label: 'Alpa',
                data: dataRefrence.map(item => item.totalAlpa),
                backgroundColor: colors.rose[300],
                }
            ]
    }) ,[dataRefrence]);
    
    return <BarChart key={title} options={opt} data={data} updateMode='show'/>
}