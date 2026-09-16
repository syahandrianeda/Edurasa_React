import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type"
import type { DisplayFormatItemSoal } from "../result/display-format-item-soal"

export interface KisiKisiMapelType {
    kodeMapel:string,
    mapelName:string,
    countRow:number,
    dataCp: DataCpKisiKisiType[]
}

export interface DataCpKisiKisiType{
    cp_id:number, 
    cp_description:string, 
    elemen:string, 
    countRow:number
    dataTp:DataTpKisiKisiType[]
}

export interface DataTpKisiKisiType{
    tp_id:number, 
    tp_description : string,
    countRow:number
    dataAtp:DataAtpKisiKisiType[]

}

export interface DataAtpKisiKisiType{
    atp_id:number, 
    atp_description: string, 
    countRow:number,
    dataMateriPokok: DataMateriPokokKisiKisiType[]
}

export interface DataMateriPokokKisiKisiType{
    materiPokok:string,
    countRow:number,
    dataSoal:DisplayFormatItemSoal[]
}

// export interface DataSoalKisiKisiType{
//      indikatorSoal:string,
//     bentukSoal:string,
//     lk:string,
//     noSoal:number,
//     stimulus:string, 
//     pertanyaan:string,
//     jsonAlatJawab:JsonAlatJawabTupple,
//     jawaban: string[]|string[][],
//     pembahasanPenskoran: string
// }