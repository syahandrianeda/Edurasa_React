import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { GenderMeta, type Gender } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";

export default function SelectGender({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-6/12",className)}>
            <SelectField
                id='gender'
                value={currentData?.pd_jk as Gender}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.pd_jk = e.target.value as Gender;
                        })
                    } 
                labelSelect="Jenis Kelamin (Gender)"
            >
                {
                    Object.entries(GenderMeta).map(([key, meta]) => (
                            <option key={key} value={key}>
                                {meta.label}
                            </option>
                        ))
                }
            </SelectField>
        </Fields>
    )
}