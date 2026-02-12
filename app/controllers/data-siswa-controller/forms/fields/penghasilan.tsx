import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { PENGHASILAN } from "~/types/enums/dari_edura";
import type{ SiswaType } from "~/types/siswa";

export function PenghasilanUmum({id,label,value, onChange, className}:{id:string, label:string, value:string, onChange:(v:string)=>void,className?:string}){

    return (
        <Fields className={cn("mt-2 mb-0 w-10/12", className)}>
                    <SelectField 
                        id={id}
                        value={value}
                        onChange={(e) =>onChange(e.target.value)} 
                        labelSelect={label}
                    >
                        {
                            PENGHASILAN.map((m,i)=>(
                                    <option key={i} value={m.value}>{m.label}</option>
                            ))
                        }
                    </SelectField>
                </Fields>
    )
}

export function PenghasilanAyah({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <PenghasilanUmum 
            id="penghasilan_ayah" 
            label="Penghasilan Ayah"
            value = {currentData?.dapo_penghasilanayah??""}
            onChange={(v:string)=>{
                setCurrentData(draft=>{
                    draft.dapo_penghasilanayah = v
                })
            }}
            className={className}/>
    )
}
export function PenghasilanIbu({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <PenghasilanUmum 
            id="penghasilan_ibu" 
            label="Penghasilan Ibu"
            value = {currentData?.dapo_penghasilanibu??""}
            onChange={(v:string)=>{
                setCurrentData(draft=>{
                    draft.dapo_penghasilanibu = v
                })
            }}
            className={className}/>
    )
}
export function PenghasilanWali({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <PenghasilanUmum 
            id="penghasilan_wali" 
            label="Penghasilan Wali"
            value = {currentData?.dapo_penghasilanwali??""}
            onChange={(v:string)=>{
                setCurrentData(draft=>{
                    draft.dapo_penghasilanwali = v
                })
            }}
            className={className}/>
    )
}