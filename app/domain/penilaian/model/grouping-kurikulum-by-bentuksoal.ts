import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

// interface bentukSoalGroup{
//     bentukSoal:ListBentukSoalType['name'],
    
// }
export interface PrediksiNoSoal extends BankSoalAppType{
    no_soal:number, 

}
interface KoleksiBentukSoal{
    bentukSoal:ListBentukSoalType['name'],
    data: PrediksiNoSoal[]
}
interface DataAtp{
    atp_id: number,
    atp_description: string,
    
    dataBentukSoal:KoleksiBentukSoal[]
}

interface DataTp{
    tp_id: number, 
    tp_description: string, 
    slotRow:number,
    dataAtp: DataAtp[]
}

interface DataCp{
    cp_id:number, 
    cp_description: string,
    slotRow:number,
    dataTp:DataTp[]
}
export interface GroupBentukSoalPropertiKurikulumInPublikasiAssesmen{
    mapelName:string,
    kodeMapel:string,
    slotRow:number,
    dataCp: DataCp[]
}
export type GroupSebaranNoSoalFromPropertyKurikulum = {koleksiBentukSoal:ListBentukSoalType[], data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmen[]}