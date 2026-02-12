import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { ABK_EDURA } from "~/types/enums/dari_edura";
import type { SiswaType } from "~/types/siswa";

export default function SelectAbk({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-6/12", className)}>
            <SelectField 
                id='abk_siswa'
                value={currentData?.dapo_kebutuhankhusus ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_kebutuhankhusus = e.target.value;
                        })
                    } 
                labelSelect="Siswa Berkebutuhan Khusus"
            >
                {
                    ABK_EDURA.map((m,i)=>(
                            <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
