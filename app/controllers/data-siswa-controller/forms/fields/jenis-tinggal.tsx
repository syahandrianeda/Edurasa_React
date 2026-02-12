import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { JENIS_TINGGAL_EDURA } from "~/types/enums/dari_edura";
import type { SiswaType } from "~/types/siswa";

export default function SelectJenisTinggal({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-6/12",className)}>
            <SelectField 
                id='jenis_tinggal'
                value={currentData?.dapo_jenistinggal ?? ""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenistinggal = e.target.value ;
                        })
                    } 
                labelSelect="Tinggal Bersama :"
            >
                {
                    JENIS_TINGGAL_EDURA.map((m,i)=>(
                            <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
