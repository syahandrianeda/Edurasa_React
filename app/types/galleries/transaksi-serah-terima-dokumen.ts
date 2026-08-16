import type { JenisSerahTerimaEnum } from "./jenis-serah-terima-enum"
import type { PersonalTypeEnum } from "./personal-type-enum"

export interface TransaksiSerahTerimaDokumenSheetType{
    idbaris: number,
    serah_terima_idbaris: number,
    target_person_id: number,
    items: string,
    jenis: string,
    idfile: string,
    oleh: string,
    snapshot: string,
    tgl: string,
    keterangan: string,
    status:string
}

export interface TransaksiSerahTerimaDokumenAppType{
    idbaris: number,
    serah_terima_idbaris: number,
    target_person_id: number,
    items: string[],
    jenis: keyof typeof JenisSerahTerimaEnum,
    idfile: string,
    oleh: string,
    snapshot: SnapshotTransaksiSerahTerima[],
    tgl: Date,
    keterangan: string,
    status:string
}

export interface SnapshotTransaksiSerahTerima{
    oleh:string,
    tgl:Date,
    jenis: keyof typeof JenisSerahTerimaEnum
    target_person_id:number,
    type_target_person:keyof typeof PersonalTypeEnum,
    idfile:string
}