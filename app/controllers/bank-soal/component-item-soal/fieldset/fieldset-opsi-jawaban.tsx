import type { ListBentukSoalType, PgKompleks, PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import FieldJumlahOpsi from "../field/FieldJumlahOpsi";
import { OptionInteractionItemSoal } from "../../editor/OptionInteractionItemSoal";
import {useCallback, useState} from 'react';
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import { useAppSelector } from "~/context-reduct/hook";
import SwitchSettingOpsi from "../field/opsi-jawaban/deprecated/switch-setting-opsi";
import WrapCreateOpsiJawaban from "../field/opsi-jawaban/wrap-create-opsi-jawaban";


export default function FieldsetOpsiJawaban(){
    const {data, action} = useCreateItemSoalContext();
    const {fokusBentukSoal} = useAppSelector(s=>s.uiFokusToolbar.data);
    

    if(!data.json_alat_jawab || !fokusBentukSoal) return null;
    
    switch(fokusBentukSoal.name){
        case 'menjodohkan':
        case 'benar_salah':
            return null
        
        default:
            return <WrapCreateOpsiJawaban bentukSoal={fokusBentukSoal}/>
    }
    // return (
        
    //     <WrapCreateOpsiJawaban bentukSoal={fokusBentukSoal}/>
    // )
}