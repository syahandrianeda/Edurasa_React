import { useState } from "react";
import type { HeaderColumnOption } from "~/components/fields/header-column-option";
import { WDSSelect } from "~/components/fields/wds-select";

const optionHeader = [
    {
        label: 'No Urut',
        value: 'id'
    },
    {
        label: 'Nama Siswa',
        value: 'pd_nama'
    },
    {
        label: 'Jenjang',
        value: 'jenjang'
    },
    {
        label: 'Kelas',
        value: 'nama_rombel'
    },
    {
        label: 'Nomor Induk Siswa',
        value: 'nis'
    },
    {
        label: 'N I S N',
        value: 'nisn'
    },
    {
        label: 'Gender',
        value: 'pd_jk'
    }
]
export function KriteriaHeaderTable({optionHeaders}:{optionHeaders:HeaderColumnOption[]}){
    const [value1, setValue1] = useState<HeaderColumnOption[]>([optionHeaders[0]])
    
    return (
        
            <WDSSelect multiple options={optionHeaders} value={value1} onChange = {(o)=>setValue1(o)}/>
            
    )
}