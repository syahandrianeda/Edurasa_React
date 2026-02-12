import { Fields, SelectField } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { getNumberFromString } from "~/lib/get-number";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function AwalKelasSiswaBaru({className, activeOnly}:{className?:string, activeOnly?:boolean}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("w-6/12 my-3",className)}>
            <SelectField 
                id='awal_kelas'
                value={currentData?.awal_kelas||""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.awal_kelas = e.target.value;
                            draft.nama_rombel = e.target.value;
                            draft.jenjang = getNumberFromString(e.target.value )  
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
