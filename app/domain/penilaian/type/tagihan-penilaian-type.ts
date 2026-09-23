import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import { ListJenisTagihan } from "~/domain/asesmen-penilaian/list-jenis-tagihan";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";

export interface TagihanPenilaianType extends PublikasiPaketAppType{
    tagihan_type : JenisTagihanPenilaiantype,
    source:'Paket Soal'|'Non Paket Soal'
    /** type koleksi respon */
}
