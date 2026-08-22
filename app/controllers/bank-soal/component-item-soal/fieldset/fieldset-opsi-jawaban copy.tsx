import type { ListBentukSoalType, PgKompleks, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import FieldJumlahOpsi from "../field/FieldJumlahOpsi";
import { OptionInteractionItemSoal } from "../../editor/OptionInteractionItemSoal";
import {useCallback, useState} from 'react';
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";


export default function FieldsetOpsiJawaban({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    const {data, action} = useCreateItemSoalContext();
    const [countOpsi, setCountOpsi] = useState<number>(4);
    const [kunciJawaban, setKunciJawaban] = useState<number>(0);// kunci jawaban menggunakan index
    const buildOpsiJawaban = useCallback((value:any, key:keyof any)=>{
        const json_alat_jawab = {[key]:value}
        return {...data, json_alat_jawab}
    }, [])

    const handleOpsi = (v:number) => {
        setCountOpsi(v);
        
    }

    return (
    <div className="relative mt-8 gap-0 bg-linear-to-br  from-sky-300 via-emerald-300 to-purple-300 shadow-md shadow-sky-600 rounded-tr-2xl rounded-b-2xl p-2 mb-3">
        <div className="font-bold absolute ps-1 pe-4 rounded-tr-2xl -top-4 left-0 bg-sky-300 text-xs">
            Opsi Jawaban:
        </div>
        <div className="border rounded text-xs">Deskripsi</div>

    </div>
    )
}