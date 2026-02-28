import { useEffect, useMemo } from "react";
import { Fields, SelectField } from "~/components/fields/fields";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { SwitchSabtuLibur } from "~/components/toolbars/state-toolbar/comp-switch";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { currentTapelProperties } from "~/lib/current-tapel";
import { formatBackendISO, formatStringBulanTahun, getBulanTapel } from "~/lib/date-helper";
import ButtonReloadAbsen from "./reload-absen-button";
import type { modeTampilanAbsenType } from "./mode-tampilan-absen-type";
import RadioboxLabel from "~/components/fields/radiobox-label";
import { BarChart, BarChart3, LifeBuoy, PieChart } from "lucide-react";
import RadioboxLabels from "~/components/fields/radio-labels";

const TampilanStatistik:modeTampilanAbsenType[] = [
    {
        name: 'sia',
        description: 'Hanya SIA'
    },
    {
        name: 'siaplus',
        description: 'Kehadiran & SIA'
    },
];
const TampilanStatistikChart:modeTampilanAbsenType[] = [
    {
        name: 'bar',
        description: 'Chart Bar'
    },
    {
        name: 'pie',
        description: 'Chart Pie'
    },
    {
        name: 'doughnut',
        description: 'Chart Doughnut'
    },
];
export const ConfigToolbarStatistikBulanan:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarAbsensiBulanan/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
function InfoToolbarAbsensiBulanan() {
    const { setValue, value } = useFilterContext()

    const firstYear = useMemo(() => {
        return currentTapelProperties({ variant: 'firstYear' })
    }, [])

    useEffect(() => {
        if (value.tahun == null) {
        setValue({ tahun: firstYear as number })
        }
    }, [firstYear, value.tahun, setValue])

    const bulanOptions = useMemo(() => {
        if (!value.tahun) return []
        return getBulanTapel(firstYear as number)
    }, [value.tahun])

    const isSameMonthYear = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth()

    useEffect(() => {
        if (!bulanOptions.length) return
        if (!value.bulan) {
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),1);
            const findBulan = bulanOptions.find(s=>s === now);
            
            setValue({ bulan: now })
            // setValue({ bulan: new Date() })
            return
        }

        const isValid = bulanOptions.some(d =>
            isSameMonthYear(d, value.bulan!)
        )

        if (!isValid) {
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),1);
            const findBulan = bulanOptions.find(s=>s === now);
            setValue({ bulan: now})
            // setValue({ bulan: new Date() })
        }
    }, [bulanOptions, value.bulan, setValue])

    const handleChangeBulan = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const iso = e.target.value
        if (!iso) return

        setValue({ bulan: new Date(iso) })
    }

    
    useEffect(()=>{
        const now = new Date(new Date().getFullYear(), new Date().getMonth(),1);
        setValue({
                bulan:now
            })
    },[])

    useEffect(()=>{
            if(!value?.modeTampilanAbsenStatistik){
                setValue({
                    modeTampilanAbsenStatistik:TampilanStatistik[0]
                })
            }
        },[]);
    const handleCheckRadio = (v:string)=>{
            const find = TampilanStatistik.find(s=>s.name === v);
            setValue({
                modeTampilanAbsenStatistik: find
            })
        };
    
    useEffect(()=>{
            if(!value?.modeTampilanChart){
                setValue({
                    modeTampilanChart:TampilanStatistikChart[0]
                })
            }
        },[]);
    const handleCheckRadioChart = (v:string)=>{
            const find = TampilanStatistikChart.find(s=>s.name === v);
            setValue({
                modeTampilanChart: find
            })
        };
    
    if (bulanOptions.length === 0) {
        return (
        <div className="bg-linear-to-br text-xs px-2 py-2">
            <p className="text-center">Pilih Data Per Bulan</p>
            <p className="italic text-muted">Data tahun tidak tersedia</p>
        </div>
        )
    }
    

    return (
        <div className="mt-2 flex  w-full py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 dark:from-sky-600 dark:to-sky-500 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-1 items-center">
        <p className="text-center">Pilih Data Per Bulan</p>

        <Fields className="w-50 mx-auto">
            <SelectField
            labelSelect="Bulan"
            value={value.bulan ? formatBackendISO(value.bulan) : ''}
            onChange={handleChangeBulan}
            >
            {bulanOptions.map((date, i) => (
                <option
                key={i}
                value={formatBackendISO(date)}
                >
                {formatStringBulanTahun(date)}
                </option>
            ))}
            </SelectField>
        </Fields>
        <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-2">
            <div className="flex w-full">
                <SwitchSabtuLibur className="w-full ms-auto"/>
            </div>
            <div className="flex w-fit pe-2 rounded bg-sky-300 border-sky-300 overflow-hidden">
                <RadioboxLabel name="sia" onChange={()=>handleCheckRadio('sia')} checked={value.modeTampilanAbsenStatistik?.name === 'sia'}><BarChart/></RadioboxLabel>
                <RadioboxLabel name="sia" onChange={()=>handleCheckRadio('siaplus')} checked={value.modeTampilanAbsenStatistik?.name === 'siaplus'}><BarChart3/></RadioboxLabel>
                <div className="w-full ms-2 pe-1 text-xs self-center">
                    {value?.modeTampilanAbsenStatistik?.description}
                </div>
            </div>
            <div className="flex w-fit pe-2 rounded-xl bg-sky-300 border-sky-300 overflow-hidden">
                <RadioboxLabels name="chart" onChange={()=>handleCheckRadioChart('bar')} checked={value.modeTampilanChart?.name === 'bar'}><BarChart3/></RadioboxLabels>
                <RadioboxLabels name="chart" onChange={()=>handleCheckRadioChart('pie')} checked={value.modeTampilanChart?.name === 'pie'}><PieChart/></RadioboxLabels>
                <RadioboxLabels name="chart" onChange={()=>handleCheckRadioChart('doughnut')} checked={value.modeTampilanChart?.name === 'doughnut'}><LifeBuoy/></RadioboxLabels>
                <div className="w-full ms-2 pe-1 text-xs self-center">
                    {value?.modeTampilanChart?.description}
                </div>
            </div>
            <ButtonReloadAbsen/>
        </div>
        </div>
    )
}
