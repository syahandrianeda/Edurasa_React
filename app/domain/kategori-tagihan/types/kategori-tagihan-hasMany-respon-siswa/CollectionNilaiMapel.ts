import type { StrukturMapelInterface } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiCp } from "./CollectionNilaiCp";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { SkorKdNullableType, SkorKdType } from "~/domain/penilaian/type/SkorKdType";
import type { CollectionNilaiCpSheet } from "./CollectionNilaiCpSheet";

export interface RefrenceAccumulatorNilaiMapelRespon {
    totalMapel:number|null,
    countSoalMapel:number
    skorMapel: number|null
}
export interface SkorNilaiFromRespon extends RefrenceAccumulatorNilaiMapelRespon {
    dataCp: CollectionNilaiCp[],
    skorKd_atp?:SkorKdNullableType
    skorKd_cp?:SkorKdNullableType
    skorKd_tp?:SkorKdNullableType
}

export interface RefrenceAccumulatorNilaiMapelSkorKdSheet {
    totalMapel_sheet:number|null,
    countSoalMapel_sheet:number,
    skorMapel_sheet:number|null,
}
export interface SkorNilaiFromSkorKdSheet extends RefrenceAccumulatorNilaiMapelSkorKdSheet{
    dataCp_sheet: CollectionNilaiCpSheet[]
    skorKd_cp_sheet?:SkorKdNullableType
    skorKd_tp_sheet?:SkorKdNullableType
    skorKd_atp_sheet?:SkorKdNullableType
}

export interface CollectionNilaiMapel extends StrukturMapelInterface, SkorNilaiFromRespon, SkorNilaiFromSkorKdSheet{
    // totalMapel:number|null,
    // countSoalMapel:number|null
    // skorMapel: number|null
    // dataCp: CollectionNilaiCp[],
    slotMapel:number,
    sumberPaketSoal:KoleksiPublikasiPaketPerMapel[]
    collection_atp_id:number[];
    collection_tp_id: number[],
    collection_cp_id: number[];
    // skorKd_atp?:SkorKdNullableType
    // skorKd_cp?:SkorKdNullableType
    // skorKd_tp?:SkorKdNullableType
    
    // skorKd_atp_sheet?:SkorKdNullableType
    // skorKd_cp_sheet?:SkorKdNullableType
    // skorKd_tp_sheet?:SkorKdNullableType
    // skorMapel_sheet?:number|null,
    // dataCp_sheet?: CollectionNilaiCpSheet[]
    // totalMapel_sheet?:number
    
}


