import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { MODA_TRANSPORTASI_EDURA } from "~/types/enums/dari_edura";
import type { SiswaType } from "~/types/siswa";

export default function SelectModaTransportasi({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField
                id='dapo_alattransportasi'
                value={currentData?.dapo_alattransportasi ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_alattransportasi = e.target.value ;
                        })
                    } 
                labelSelect="Moda Transportasi"
            >
                {
                    MODA_TRANSPORTASI_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
