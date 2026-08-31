import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { ListBentukSoalType, PgTunggal } from "~/types/bank-soal/bentuk-soal-type"
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type"
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type"
import PgKompleksPreview from "./pg-kompleks-view"
import PgPreview from "./pg-tunggal-view"

type Props = {
    data:BankSoalAppType,
    // bentukSoal:ListBentukSoalType
}
export default function OpsiSoalPreview ({data}:Props){
    switch(data.bentuk_soal){
        case 'pg':
            return <PgPreview data={data}/>
        case 'pg_kompleks':
            return <PgKompleksPreview data={data}/>
        default:
            return null;
    }
}
