import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { AgamaMeta, type Agama } from "~/types/enums/agama";
import type { SiswaType } from "~/types/siswa";

export default function SelectAgama({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-6/12",className)}>
            <SelectField 
                id='agama'
                value={currentData?.pd_agama as Agama}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.pd_agama = e.target.value as Agama;
                        })
                    } 
                labelSelect="Agama"
            >
                <option value="">Belum Memilih</option>
                {
                    Object.entries(AgamaMeta).map(([key, meta]) => (
                            <option key={key} value={key}>
                                {meta.label}
                            </option>
                        ))
                }
            </SelectField>
        </Fields>
    )
}
