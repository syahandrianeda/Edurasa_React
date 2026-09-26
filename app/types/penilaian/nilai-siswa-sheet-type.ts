import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type"
import type { KategoriTagihanType } from "~/domain/penilaian/infrastucture/KategoriTagihanType"

export interface NilaiSiswaSheetType{
    idbaris: number,	
    siswa_id: number,
    publikasi_id: number,
    jenis_tagihan: JenisTagihanPenilaiantype['kode'],
    tipe_assesmen: KategoriTagihanType,
    sumber_respon: string,
    rombel: string,
    start_time: string,
    end_time:string,
    
    /** untuk mengisi pg_1, essay_1, */
    [key:string]: string|number
}