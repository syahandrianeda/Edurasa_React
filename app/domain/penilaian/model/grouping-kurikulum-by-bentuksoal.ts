import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { ScoreAccumulator } from "../infrastucture/ScoreAccumulator";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";

// interface bentukSoalGroup{
//     bentukSoal:ListBentukSoalType['name'],
    
// }
export interface PrediksiNoSoal extends BankSoalAppType{
    no_soal:number, 
    skor:number

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
type DataBentukSoalWithScore = {
    bentukSoal: ListBentukSoalType['name'],
    data: PrediksiNoSoal[]
}
type DataAtpMap = {
    atp_id : number,
    atp_description : string,
    skor: number;
    total: number,
    jumlahSoalDinilai: number;
    dataBentukSoal: DataBentukSoalWithScore[]
    
};
interface DataTpMap{
    tp_id : number,
    tp_description : string,
    skor: number
    total: number,
    jumlahSoalDinilai: number,
    slotRow: number
    dataAtp: DataAtpMap[]
     
}
interface DataCpWithScore{
    cp_id : number,
    cp_description : string,
    skor: number
    total: number,
    jumlahSoalDinilai: number,
    slotRow: number,
    dataTp : DataTpMap[]
   
}
export interface GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore{
    kodeMapel: string,
    mapelName : string,
    skor: number,
    total: number,
    jumlahSoalDinilai: number,
    slotRow: number,
    dataCp: DataCpWithScore[],
    objekSkorKd: {[key:string]:number}
    
}

/** detail data TEMPLATE SKOR dan penskorannya tiap item soal berdasarkan struktur naskahnya. Namun belum merefrensi ke skor respon siswa*/
export type GroupSebaranNoSoalFromPropertyKurikulum = {koleksiBentukSoal:ListBentukSoalType[], data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmen[]}

/** detail data SKOR dan PENSKORANNYA tiap item soal berdasarkan struktur naskahnya dan SUDAH merefrensi skor asli respon siswa */
export type GroupSebaranNoSoalFromPropertyKurikulumWithScore = {koleksiBentukSoal:ListBentukSoalType[], data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore[]}

/** tipe yang sama dengan  `GroupSebaranNoSoalFromPropertyKurikulum` */
export type KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal = GroupSebaranNoSoalFromPropertyKurikulum