import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function TempatLahir({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 w-5/12",className)}>
            <InputText
                id="pd_tl"
                value={currentData?.pd_tl??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_tl = v.toUpperCase()
                    })}
                }
                placeholder="Tempat Lahir"
                label="Tempat Lahir"
                required
            />
        </Fields>
    )
}
