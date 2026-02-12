import { Fields, SelectField } from "~/components/fields/fields";
import type { OptionsSelection } from "~/components/form-custom/filed-types";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export const StatusSiswaCollection:OptionsSelection[] = [
    {
        value:'',
        label: 'Belum Memilih'
    },
    {
        value:'aktif',
        label: 'Aktif'
    },
    {
        value:'non-aktif',
        label: 'Non-Aktif'
    },
    {
        value:'meninggal dunia',
        label: 'Meninggal Dunia'
    },
    {
        value:'lulus',
        label: 'Lulus'
    },
    {
        value:'pindah',
        label: 'Mutasi/Pindah Sekolah'
    },

]
export default function SelectKeaktifan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 mx-auto",className)}>
            <SelectField 
                id='status'
                value={currentData?.aktif}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.aktif = e.target.value;
                        })
                    } 
                labelSelect="Status Keaktifan"
            >
                {
                    StatusSiswaCollection.map((map,i)=>(
                        <option
                            key={i}
                            value={map.value}
                        >
                            {map.label}
                        </option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}