import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type"

export interface KisiKisiMapelType {
    kodeMapel:string,
    mapelName:string,
    dataCp: DataCpKisiKisiType[]
}

export interface DataCpKisiKisiType{
    cp_id:number, 
    cp_description:string, 
    elemen:string, 
    dataTp:DataTpKisiKisiType[]
}

export interface DataTpKisiKisiType{
    tp_id:number, 
    tp_description : string,
    dataAtp:DataAtpKisiKisiType[]

}

export interface DataAtpKisiKisiType{
    atp_id:number, 
    atp_description: string, 
    dataMateriPokok: DataMateriPokokKisiKisiType[]
}

export interface DataMateriPokokKisiKisiType{
    materiPokok:string,
    dataSoal:DataSoalKisiKisiType[]
}
export interface DataSoalKisiKisiType{
     indikatorSoal:string,
    bentukSoal:string,
    lk:string,
    noSoal:number,
    stimulus:string, 
    pertanyaan:string,
    jsonAlatJawab:JsonAlatJawabTupple,
    jawaban: string[]|string[][],
    pembahasanPenskoran: string
}