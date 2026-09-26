import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type"
import type { KategoriTagihanType } from "~/domain/penilaian/infrastucture/KategoriTagihanType"
import type { AtpAsOrm } from "../kurikulum/prota-orm"
import type { BankSoalAppType } from "../bank-soal/bank-soal-type"
import type { ListBentukSoalType } from "../bank-soal/bentuk-soal-type"

export interface NilaiSiswaAppType{
    idbaris: number,	
    siswa_id: number,
    publikasi_id: number,
    jenis_tagihan: JenisTagihanPenilaiantype['kode'],
    tipe_assesmen: KategoriTagihanType,
    sumber_respon: string,
    rombel: string,
    start_time: Date|null,
    end_time:Date|null,
    respon: RisponsePenilaianSiswa[]
    /** untuk mengisi pg_1, essay_1, */
    // [key:string]: string|number
};

export interface RisponsePenilaianSiswa{
    
    index: number,
    respon: string,
    skor: number,
    no_soal: number,
    bentuk_soal:ListBentukSoalType['name']
    atp?: AtpAsOrm,
    soal_id?: BankSoalAppType




}