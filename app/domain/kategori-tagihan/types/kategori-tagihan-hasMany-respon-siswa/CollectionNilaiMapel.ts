import type { StrukturMapelInterface } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiCp } from "./CollectionNilaiCp";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { SkorKdNullableType, SkorKdType } from "~/domain/penilaian/type/SkorKdType";
import type { CollectionNilaiCpSheet } from "./CollectionNilaiCpSheet";

export interface CollectionNilaiMapel extends StrukturMapelInterface{
    totalMapel:number|null,
    countSoalMapel:number|null
    skorMapel: number|null
    dataCp: CollectionNilaiCp[],
    sumberPaketSoal:KoleksiPublikasiPaketPerMapel[]
    collection_atp_id:number[];
    collection_tp_id: number[],
    collection_cp_id: number[];
    skorKd_atp?:SkorKdNullableType
    skorKd_cp?:SkorKdNullableType
    skorKd_tp?:SkorKdNullableType
    
    skorKd_atp_sheet?:SkorKdNullableType
    skorKd_cp_sheet?:SkorKdNullableType
    skorKd_tp_sheet?:SkorKdNullableType
    skorMapel_sheet?:number,
    dataCp_sheet?: CollectionNilaiCpSheet[]
    totalMapel_sheet?:number
    
}


