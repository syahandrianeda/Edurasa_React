import { useState } from "react";
import { SelectCommonsField } from "~/components/selects/select-commons";
import { JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import type { handleProps } from "./props-serah-terima";

export default function SelectTypeJenisKegiatan({value, setValue,disabled}:handleProps){
    const dataJenisKegiatan = Object.entries(JenisSerahTerimaEnum).map(([key, value])=>({key,value}))
    const [jenis, setJenis] = useState<string>(value?.jenis ?? '');
    
    const handleJenis = (v:string)=>{
        setJenis(v);
        if(v==="") {
            setValue?.(draft=>{
                draft.jenis = undefined
            })
        }else{
            setValue?.(draft=>{
                draft.jenis = v as keyof typeof JenisSerahTerimaEnum
            })
        }
    }
    
    return (
        <SelectCommonsField
            fieldClassName="md:w-3/5"
            label="Jenis Kegiatan Penyerahan/Penerimaan"
            labelClassName="max-w-11/12 md:max-w-3/5 "
            data={dataJenisKegiatan}
            value={jenis}
            setValue={handleJenis}
            keySelected="key"
            labelSelected="value"
            disabled={disabled}
            />
    )
}