import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";


export interface BankSoalHasImplemented extends BankSoalAppType{
    hasImplemented : paketSoalImplemented[]
}

export interface paketSoalImplemented{
        paketSoal_id: number, 
        no_index: number, 
        no_soal: number
}
export type GroupingBentukSoalType = {
    bentukSoal:ListBentukSoalType,
    data: BankSoalAppType[]
}

export type AtpHasManySoalType = AtpAsOrm & {hasSoal: BankSoalAppType[]}
export type dataAtpMany = {
    atp_id: number,
    atp_description: string,
    source:AtpHasManySoalType,
    kelas:number[],
    hasSoal: GroupingBentukSoalType[];
}
export type dataTpMany = {
    tp_id:number, 
    tp_description: string,
    hasAtp:dataAtpMany[]
}
export type GroupingAtpHasManySoalType = {
    kodeMapel: string, 
    mapelName: string,
    hasTp:dataTpMany[],
    countAtp:number
}