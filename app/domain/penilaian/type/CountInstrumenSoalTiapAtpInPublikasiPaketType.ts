import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { KategoriTagihanType } from "./KategoriTagihanType";

export type RefrensiTabResponTagihanJenjangType={
    /** respon_id, diambil dari sheet Nilai_<jenjang> tab: `respon_tagihan_<jenjang>  */
    responId:number
    /** diambil dari kolom `skor_<index> */
    skor:number |null
    /** bentuk_soal, diambil dari naskah soal/'publikasi_paket' */
    bentukSoal: string,
    /** nomor soal */
    noSoal:number
    responJawaban:string|null,
    atp_id:number,
    kunciJawabanPg:string
}

export type DataRefrensiPerBentukSoal = {
    bentukSoal: ListBentukSoalType['name'],
    data: RefrensiTabResponTagihanJenjangType[]
}
export type SkorKdType = Record<string, number>;
export type DataSkorSiswaByInstrumenType = {
    siswa_id:number,
    namaSiswa:string,
    dataRefrensiTabResponTagihanJenjang: RefrensiTabResponTagihanJenjangType[],
    dataPerBentukSoal: DataRefrensiPerBentukSoal[]
    /** `total` = akumulasi skor pada `RefrensiTabResponTagihanType` */
    total: number,
    /** `countSoal` = jumlah data `RefrensiTabResponTagihanType` */
    countSoal:number,
    /** skor di level ini, adalah perhitungan `total` dibagi `countSoal` dengan 2 angka di belakang koma*/
    skor:number,
    /** skorKd berformat: {<kodeMapel>_<atp_id> : skor} */
    skorKd: SkorKdType

   
}

export type DataSoalNaskah = {
    bentukSoal: ListBentukSoalType
    koleksiNoSoal: number[]
}
export type DetailPublikasiWithResponSiswaType = {
    namaPublikasi:string,
    counstInstrumen: number,
    /** `dataResponSiswa` adalah data seluruh siswa yang menjawab instrumen di `atp_id`. `atp_id` berada di parent type ini */
    dataResponSiswa: DataSkorSiswaByInstrumenType[],
    atp_id:number,
    dataSoalNaskah: DataSoalNaskah[],
    mapelNaskah:string
}

export type DataPublikasiPerTipeAssesmenType = {
    tipe_assesmen: KategoriTagihanType,
    DetailPublikasiWithResponSiswa: DetailPublikasiWithResponSiswaType[]
}
export type CollectionAtpInAllPublikasiPaketType = {
    atp_id: number,
    atp_description: string,
    dataTipeAssesmen: DataPublikasiPerTipeAssesmenType[]
    // slotRow:number,
}
export type CollectionTpInAllPublikasiPaketType={
    tp_id:number,
    tp_description: string,
    dataAtp:CollectionAtpInAllPublikasiPaketType[];
    slotRow:number
}
export type CollectionCpInAllPublikasiPaketType = {
    cp_id:number,
    cp_description: string,
    dataTp: CollectionTpInAllPublikasiPaketType[],
    slotRow:number

}
export type CollactionMapelInAllPublikasiPaketType={
    kodeMapel: string,
    mapelName: string,
    dataCp: CollectionCpInAllPublikasiPaketType[],
    slotRow:number
}
/**
 * MAPPER
 */
export type DataTipeAssesmenMapper= Map<KategoriTagihanType, DetailPublikasiWithResponSiswaType[]>
export type AtpMapperInAllPublikasiPaket = {
    atp_id: number,
    atp_description: string,
    // slotRow:number
    // dataTipeAssesmenMapper: DataTipeAssesmenMapper;//DetailPublikasiWithResponSiswaType[];
}
export type TpMapperInAllPublikasiPaket = {
    tp_id: number,
    tp_description: string, 
    // slotRow: number
    dataAtpMapper: Map<number, AtpMapperInAllPublikasiPaket>
}
export type CpMapperInAllPublikasiPaket = {
    cp_id: number,
    cp_description: string, 
    // slotRow: number,
    dataTpMapper: Map<number, TpMapperInAllPublikasiPaket>
}
export type MapelMapperInAllPublikasiPaket = {
    mapelName: string, 
    kodeMapel: string,
    // slotRow:number,
    dataCpMapper: Map<number, CpMapperInAllPublikasiPaket>
}