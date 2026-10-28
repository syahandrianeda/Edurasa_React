import type { StrukturAtpType, StrukturCpType, StrukturMapeltype, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { KategoriTagihanType } from "../../../kategori-tagihan/types/entities/KategoriTagihanType";
import type { DetailPublikasiWithResponSiswaType } from "./DetailPublikasiWithResponSiswaType";
import type { TagihanHasDataResponse } from "../tagihan-assesmen-type";

/**
 * MAPPER
 */
export type DataTipeAssesmenMapper= Map<KategoriTagihanType, DetailPublikasiWithResponSiswaType[]>
export type AtpMapperInAllPublikasiPaket = StrukturAtpType;
// {
//     atp_id: number,
//     atp_description: string,
    
// }
export type TpMapperInAllPublikasiPaket = StrukturTpType & {
    // tp_id: number,
    // tp_description: string, 
    // slotRow: number
    dataAtpMapper: Map<number, AtpMapperInAllPublikasiPaket>
}
export type CpMapperInAllPublikasiPaket = StrukturCpType & {
    // cp_id: number,
    // cp_description: string, 
    // slotRow: number,
    dataTpMapper: Map<number, TpMapperInAllPublikasiPaket>
}
export type MapelMapperInAllPublikasiPaket = StrukturMapeltype & {
    // mapelName: string, 
    // kodeMapel: string,
    // slotRow:number,
    dataCpMapper: Map<number, CpMapperInAllPublikasiPaket>
    koleksiPublikasiPaket:KoleksiPublikasiPaketPerMapel[]
}
export type KoleksiPublikasiPaketPerMapel = {
    idbaris: number, 
    namaPublikasi: string;
    koleksiMapel: string[],
    countRespon:number,
    detail?:TagihanHasDataResponse
}