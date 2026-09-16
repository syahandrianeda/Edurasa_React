import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { FormatElemen, ListBentukSoalType, PgTunggal } from "~/types/bank-soal/bentuk-soal-type"
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type"
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type"
import PgKompleksPreview from "./pg-kompleks-view"
import PgPreview from "./pg-tunggal-view"

type Props = {
    data:BankSoalAppType,
    // bentukSoal:ListBentukSoalType
    setDisplay?:FormatElemen
}
export default function OpsiSoalPreview ({data, setDisplay='vertical'}:Props){
    switch(data.bentuk_soal){
        case 'pg':
            return <PgPreview data={data} setDisplay={setDisplay}/>
        case 'pg_kompleks':
            return <PgKompleksPreview data={data}/>
        default:
            return null;
    }
}
