import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function NoNIK({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 w-3/12",className)}>
            <InputText
                id="no_nik"
                value={currentData?.nik??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nik = v
                    })}
                }
                placeholder="NIK Siswa"
                label="NIK Siswa"
            />
        </Fields>
    )
}
