import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { modeTampilanAbsenType } from "./mode-tampilan-absen-type";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useEffect } from "react";
import { SwitchSabtuLibur } from "~/components/toolbars/state-toolbar/comp-switch";
import RadioboxLabel from "~/components/fields/radiobox-label";
import ButtonReloadAbsen from "./reload-absen-button";
import { Smile, UserCircle } from "lucide-react";

export const ConfigToolbarAbsenHariIni:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarAbsensiHariIni/>
        },
    ]
}
const TampilanAbsen:modeTampilanAbsenType[] = [
    {
        name: 'icon',
        description: 'Mode Emoji'
    },
    {
        name: 'profil',
        description: 'Mode Poto Profil'
    },
];

export function InfoToolbarAbsensiHariIni() {
    const { setValue, value } = useFilterContext()

    useEffect(()=>{
        if(!value?.modeTampilanAbsen){
            setValue({
                modeTampilanAbsen:TampilanAbsen[1]
            })
        }
    },[]);

    useEffect(()=>{
        
        if(!value?.bulan){
            
            setValue({
                bulan:new Date()
            })
            
        }
    },[])

    const handleCheckRadio = (v:string)=>{
        const find = TampilanAbsen.find(s=>s.name === v);
        setValue({
            modeTampilanAbsen: find
        })
    }

    return (
        <div className="mt-2 flex h-20 w-full py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 dark:from-sky-600 dark:to-sky-500 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-1 items-center">
            <div className="grid grid-cols-1 h-full md:grid-cols-3 items-center justify-center gap-2">
                <div className="flex w-full">
                    <SwitchSabtuLibur className="w-full ms-auto"/>
                </div>
                <div className="flex w-fit border rounded shadow-sky-400 dark:border-sky-300">
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
