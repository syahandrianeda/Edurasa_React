import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function NomorSeriIjazah({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="noseri-ijazah"
                value={currentData?.dapo_noseriijazah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_noseriijazah = v
                    })}
                }
                placeholder="No Seri Ijazah"
                label="No Seri Ijazah"
            />
        </Fields>
    )
}
export function LulusMelanjutkanKe({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="melanjutkan-smp"
                value={currentData?.smp_ke??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.smp_ke = v
                    })}
                }
                placeholder="SMP Sederajat"
                label="Melanjutkan Ke SMP Sederajat"
            />
        </Fields>
    )
}