import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";

export type BuktiSerahTerima='ttd'|'poto';
export interface UiFokusCollection{
    serahTerimaDokumen?:number,
    buktiSerahTerima?:BuktiSerahTerima,
    fillTgl:boolean
}

export const initialUiFokusCollection:UiFokusCollection ={
    serahTerimaDokumen:0,
    buktiSerahTerima:'poto',
    fillTgl:true

}