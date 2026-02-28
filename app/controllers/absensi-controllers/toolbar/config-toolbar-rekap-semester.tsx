import { Check, Smile,UserCircle } from "lucide-react";
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

export const ConfigToolbarRekapSemesterSiswa:TabsConfigProps =  {
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
    const handleChangeBulan = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const iso = e.target.value
        let d:Date = new Date();
        let isCurrentSemester = d.getMonth()>5?'1':'2'
        if (!iso) return
        if(iso === '1'){
            d = isCurrentSemester==='1'?new Date():new Date(firstYear as number, 6, 1)
        }else{
            d =isCurrentSemester==='2'?new Date(): new Date((firstYear as number)+1, 5, 1)

        }
        setValue({ bulan: new Date(d) })
    }

    useEffect(()=>{
        if(!value?.modeTampilanAbsen){
            setValue({
                modeTampilanAbsen:TampilanAbsen[1]
            })
        }
    },[value?.modeTampilanAbsen]);

    useEffect(()=>{
        
        // if(!value?.bulan){
            const now = new Date(new Date().getFullYear(), new Date().getMonth(),1);
            setValue({
                bulan:now
            })
            
        // }
    },[])

    

    return (
        <div className="mt-2 flex  w-full py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 dark:from-sky-600 dark:to-sky-500 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-1 items-center">
        <p className="text-center">Pilih Data Per Semester</p>

        <Fields className="w-50 mx-auto">
            <SelectField
            labelSelect="Semester"
            value={value.bulan ? value?.bulan?.getMonth()>5?1 : 2:1}
            onChange={handleChangeBulan}
            >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
            </SelectField>
        </Fields>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-2">
            <div className="flex w-full">
                <SwitchSabtuLibur className="w-full ms-auto"/>
            </div>
            <ButtonReloadAbsen/>
        </div>
        </div>
    )
}
