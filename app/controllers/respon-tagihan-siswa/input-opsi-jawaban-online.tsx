import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import { FormIsianSingkat } from "./FormIsianSingkat";
import { FormPgOnline } from "./FormPgOnline";

export type Props={
    data:BankSoalAppType,
    no_prefix: number,
    dataRespon:RisponsePenilaianSiswa,
    handleChange: (field:RisponsePenilaianSiswa, value:string, skor:number)=>void
}
export default function InputOpsiJawabanOnline({data, no_prefix, dataRespon, handleChange}:Props){
    switch(data.bentuk_soal){
        case  'pg':
            return <FormPgOnline data={data} no_prefix={no_prefix} dataRespon={dataRespon} handleChange={handleChange}/>
        case  'isian_singkat':
            return <FormIsianSingkat data={data} no_prefix={no_prefix} dataRespon={dataRespon} handleChange={handleChange}/>
        case  'essay':
            return <FormIsianSingkat data={data} no_prefix={no_prefix} dataRespon={dataRespon} handleChange={handleChange}/>
        default:
            return null
    }
}

