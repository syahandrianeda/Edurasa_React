import { type Dispatch, type SetStateAction } from "react";
import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import EditJumlahOpsiPG from "./edit-jumlah-opsi";
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type";

type Props ={
    bentukSoal:string, 
    opsiJawaban?:JsonAlatJawabTupple,
    setOpsiJawaban?:Dispatch<SetStateAction<JsonAlatJawabTupple|undefined>>
}

export default function SwitchJumlahOpsi({
    bentukSoal,
    opsiJawaban, 
    setOpsiJawaban
}:Props){
    switch(bentukSoal){
        case 'pg':
            return <EditJumlahOpsiPG opsiJawaban={opsiJawaban as PgTunggalType} setOpsiJawaban={setOpsiJawaban as Dispatch<SetStateAction<PgTunggalType>>}/>;
        case 'pg_kompleks':
            return <p>On Proses</p>
        default:
            return null
    }
}