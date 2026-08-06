import type { Updater } from "node_modules/use-immer/dist/index.mjs";
import { useMemo, type Dispatch } from "react";
import { SelectField } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import { useAppSelector } from "~/context-reduct/hook";
import { DataSiswaAktifRombel } from "~/context-reduct/selectores/data-siswa-aktif";
import { DataCustomerSiswaCurrentRombel } from "~/context-reduct/selectores/data-siswa-aktif-keuangan";
import type { SiswaType } from "~/types/siswa";
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type";


export interface FieldCustomerSiswaProps{
    value:TabunganAppType,
    setValue:(updater: (draft: TabunganAppType) => void) => void;//Updater<TabunganAppType>
    values:TabunganAppType[],
    disabled:boolean

}
export default function FieldCustomerSiswa({value, setValue, values, disabled}:FieldCustomerSiswaProps){
    const SiswaRombel:SiswaType[] = useAppSelector(DataCustomerSiswaCurrentRombel);
    const ListSiswa = useMemo(()=>{
        return SiswaRombel.filter(s=> !values.map(m=>m.siswa_id).includes(s.id))
    },[SiswaRombel, values]);

    const handleSelectSiswa = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const {value, name} = e.currentTarget;
        const siswa= SiswaRombel?.find(s=> s.id === Number(value))
        setValue(draft=>{
            draft.siswa_id = siswa?.id,
            draft.nama_siswa = siswa?.pd_nama
        })
    }

    
    return (
        <Field className="relative w-10/12 mx-auto mt-4">
            <SelectField 
                disabled={disabled}
                id="penabung"
                tabIndex={0}
                labelSelect="Nasabah"
                value = {value.siswa_id ?? ''}
                onChange={handleSelectSiswa}
                >
                    <option value="">Pilih Siswa</option>
                {
                    ListSiswa.map((m, i)=>
                        <option key={m.id} value={m.id}>{m.pd_nama} ({m.nama_rombel})</option>
                    )

                }
            </SelectField>
        </Field>
    )
}