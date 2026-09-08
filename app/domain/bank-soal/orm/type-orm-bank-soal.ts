import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export type dataCollectionSoalAtp = {
    bentukSoal:ListBentukSoalType['name']
    data:BankSoalAppType[]
}
export type AtpSoal = AtpAsOrm & {koleksiSoal:dataCollectionSoalAtp[]};
export type dataGroupTp = {
    tp_id:number,
    tp_description:string,
    data: dataGroupAtp[]

}
export type dataGroupAtp = {
    atp:string, 
    koleksiSoal:dataCollectionSoalAtp[]
    source:AtpSoal
}
export type GroupSoal = {
    kode_mapel: string,
    data:dataGroupTp[],
    
}
export type GroupSoalDetail = {
    kode_mapel: string,
    
    data:dataGroupTp[],
    
}