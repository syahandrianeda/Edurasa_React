import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { FormatElemen, ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export interface DisplayFormatItemSoal{
    index:number,
    no_soal:number,
    data_soal?:BankSoalAppType,
    format_display?:FormatElemen,
    bentuk_soal?:ListBentukSoalType,
    showStimulus:boolean
    
}