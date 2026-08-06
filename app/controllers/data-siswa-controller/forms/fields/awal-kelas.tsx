import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function AwalKelas({className, activeOnly}:{className?:string, activeOnly?:boolean}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("md:w-6/12 w-10/12 my-3",className)}>
            <SelectField 
                id='awal_kelas'
                value={currentData?.awal_kelas||""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.awal_kelas = e.target.value 
                        })
                    } 
                labelSelect="Diterima Di Kelas (Awal Kelas):"
            >
                {
                    activeOnly ?(
                        DataRombelUI.filter(s=>s.active).map((m,i)=>(
                            <option key={i} value={m.rombelName}>
                                {m.rombelName}
                            </option>
                        ))
                    ):(
                        DataRombelUI.map((m,i)=>(
                            <option key={i} value={m.rombelName}>
                                {m.rombelName}
                            </option>
                        ))

                    )
                }
            </SelectField>
        </Fields>
    )
}
