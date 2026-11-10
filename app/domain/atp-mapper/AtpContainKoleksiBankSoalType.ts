import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { StrukturAtpType, StrukturCpType, StrukturMapeltype, StrukturTpType } from "../trees-struktur-kurikulum";

export type AtpContainKoleksiBankSoalMapperType = Map<number, BankSoalAppType[]>;
export type AtpContainKoleksiBankSoalType = StrukturMapeltype & StrukturCpType & StrukturTpType & StrukturAtpType & {
    // atp_id:number,
    atpSoal:BankSoalAppType[]
    
}
