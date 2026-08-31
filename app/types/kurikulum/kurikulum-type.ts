import type { Agama } from "../enums/agama";
import type { AtpKurikulumType } from "./atp-kurikulum";
import type { ElemenCpType } from "./elemen-cp";
import type { FaseKurikulumType } from "./fase-kurikulum";

export type resourcesKurikulum = {
    cp: ElemenCpType[],
    fase:faseResource[],
    atp:AtpKurikulumType[]
}
export type faseResource = {
    
        fase:faseMerdekaType,
        data:FaseKurikulumType[],
        memberJenjang:[1,2]
    
}
export type faseMerdekaType='A'|'B'|'C';
/** ini tuh sebenarnya Orm ATP */
export interface OrmKurikulumMerdekaType{
    id_elemen_cp:number,
    kodemapel:string,
    elemen:string,
    tp_fase_properties:OrmFaseKurikulumType[],
    cp_utama:string,
    index:number,
    taksonomibloom?:string,
    countItem:number,
    lingkup_materi:string
}

export interface OrmFaseKurikulumType{
    idbaris_tp:number,
    fase_name:string, // fase A, fase B, fase C
    source_tab?:string,
    source_data_tp?:FaseKurikulumType
    tp:string,
    kelas?:number[],
    atp:OrmAtp[],
    countItem:number
}
export interface OrmAtp{
    idbaris_atp:number,
    atp:string,
    source_atp?:AtpKurikulumType,
    kelas:number[],
    countItem:number,
    status?:string
}
export interface ormKurikulumInterface{
    mapel_nama:string,
    mapel_kode:string,
    mapel_kode_umum:string,
    mapel_khusus_penganut?:Agama|null,
    mapel_id:number, // digunakan untuk pengurutan di rapor
    fase: faseOrm[]

}
export interface currentFase extends ormKurikulumInterface{
    currentFase:faseOrm
}
export interface faseOrm{
    faseName:faseMerdekaType,
    elemen_cp:OrmKurikulumMerdekaType[],
    countItems:number,
    memberJenjang:number[]

}