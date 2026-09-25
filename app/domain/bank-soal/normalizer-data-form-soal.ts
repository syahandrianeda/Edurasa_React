import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default function dataFormItemSoalNormalize(data:BankSoalSheetType,bentukSoal:ListBentukSoalType):BankSoalSheetType{
    switch(bentukSoal.name){
        case 'essay':
            return {...data, json_alat_jawab:'', jawaban:''};
        case 'isian':
            return {...data, json_alat_jawab:'', jawaban:''};
        case 'isian_singkat':
            return {...data, json_alat_jawab:'', jawaban:''};
            
        default:
            return data;
    }
}