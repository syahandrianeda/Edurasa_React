import { Check, MarsStroke, Smile, User, UserCircle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Fields, SelectField } from "~/components/fields/fields";
import RadioboxLabel from "~/components/fields/radiobox-label";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { SwitchSabtuLibur } from "~/components/toolbars/state-toolbar/comp-switch";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { currentTapelProperties } from "~/lib/current-tapel";
import { formatBackendISO, formatStringBulanTahun, getBulanTapel } from "~/lib/date-helper";
import type { modeTampilanAbsenType } from "./mode-tampilan-absen-type";
import ButtonReloadAbsen from "./reload-absen-button";

export const ConfigToolbarAbsenBulanan:TabsConfigProps =  {
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
const TampilanAbsen:modeTampilanAbsenType[] = [
    {
        name: 'marked',
        description: 'Mode Ceklis'
    },
    {
        name: 'icon',
        description: 'Mode Emoji'
    },
    {
        name: 'profil',
        description: 'Mode Poto Profil'
    },
];

export function InfoToolbarAbsensiBulanan() {
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
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().setDate(1));
            const findBulan = bulanOptions.find(s=>s === now);
            
            // setValue({ bulan: bulanOptions[0] })
            setValue({ bulan: new Date() })
            return
        }

        const isValid = bulanOptions.some(d =>
            isSameMonthYear(d, value.bulan!)
        )

        if (!isValid) {
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().setDate(1));
            const findBulan = bulanOptions.find(s=>s === now);
            // setValue({ bulan: bulanOptions[0] })
            setValue({ bulan: new Date() })
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
        if(!value?.modeTampilanAbsen){
            setValue({
                modeTampilanAbsen:TampilanAbsen[1]
            })
        }
    },[]);
    useEffect(()=>{
        
        if(!value?.bulan){
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),1);
            setValue({
                bulan:now
            })
            
        }
    },[])
    const handleCheckRadio = (v:string)=>{
        const find = TampilanAbsen.find(s=>s.name === v);
        setValue({
            modeTampilanAbsen: find
        })
    }

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
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2">
            <div className="flex w-full">
                <SwitchSabtuLibur className="w-full ms-auto"/>
            </div>
            <div className="flex w-fit border rounded shadow-sky-400 dark:border-sky-300">
                <RadioboxLabel onChange={()=>handleCheckRadio('marked')} checked={value.modeTampilanAbsen?.name === 'marked'}><Check/></RadioboxLabel>
                <RadioboxLabel onChange={()=>handleCheckRadio('icon')} checked={value.modeTampilanAbsen?.name === 'icon'}><Smile/></RadioboxLabel>
                <RadioboxLabel onChange={()=>handleCheckRadio('profil')} checked={value.modeTampilanAbsen?.name === 'profil'}><UserCircle/></RadioboxLabel>
                <div className="w-full ms-2 pe-1 text-xs self-center">
                    {value?.modeTampilanAbsen?.description}
                </div>
            </div>
            <ButtonReloadAbsen/>
        </div>
        </div>
    )
}
