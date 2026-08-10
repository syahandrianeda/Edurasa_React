import { useEffect, useState } from "react";
import type { Updater } from "use-immer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { PangkatGolonganHardCode } from "~/domain/tendik/entities/pangkat-golongan-type";
import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";

export default function PangkatGolonganAsn({value, setValue}:{value:PangkatGolonganAppType, setValue:Updater<PangkatGolonganAppType>}){
    const [selected, setSelected] = useState<string>(value?.daftar_pangkat_id?.toString()??'');
    // useEffect(()=>{
    //     if(!value) return;
    //     setSelected(value?.daftar_pangkat_id?.toString())
        
    // },[])
    return (
        <div className="flex flex-col gap-0 relative mt-4">
            <div className="absolute peer px-1 left-0 top-0 -translate-y-3 text-xs z-10  bg-white dark:bg-gray-700 dark:text-sky-100 w-fit rounded-se-xl text-[10px]">
                Pangkat dan Golongan
            </div>
            <Select
                value={selected}
                onValueChange={ (val)=>{
                    setSelected(val);
                    const numb = Number(val);
                    const found = PangkatGolonganHardCode.find(s=>s.idbaris === numb);
                    if(found){
                        setValue(draft=>{
                            draft.golongan = found.golongan;
                            draft.pangkat = found.pangkat;
                            draft.ruang = found.ruang;
                            draft.daftar_pangkat_id = found.idbaris

                        })
                    }
                }}
            
            >
                <SelectTrigger className="bg-white dark:bg-gray-700 w-full dark:text-sky-100 pr-10 rounded-ss-none border-0 text-sky-800 focus-visible:ring-0 focus:border-0 focus:outline-none">
                    <SelectValue placeholder="Pilih Nama Pangkat/Golongan"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        PangkatGolonganHardCode.map((m, i)=>
                            <SelectItem key={m.idbaris} value={m.idbaris.toString()}>
                                {m.ruang ?`${m.golongan}/${m.ruang}`:m.golongan} - {m.pangkat} ({m.asn.toUpperCase()})
                            </SelectItem>
                        )
                    }
                </SelectContent>
            </Select>
        </div>
    )
}