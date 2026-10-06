import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type"
import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType"
import type { AtpAsOrm } from "../kurikulum/prota-orm"
import type { ListBentukSoalType } from "../bank-soal/bentuk-soal-type"
import type { SiswaType } from "../siswa"
import type { PublikasiPaketAppType } from "../bank-soal/entities/publikasi-paket-app-type"
import type { TagihanAsessmenType, TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type"
import type { templateResponseKoreksi } from "~/domain/penilaian/type/templateResponseKoreksi"
import type { TemplateKoreksiSiswaType } from "./TemplateKoreksiSiswaType"
import type { GroupSebaranNoSoalFromPropertyKurikulumWithScore } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal"

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
    skor_kd?:SkorKdResponSiswaType[]
    needValidate:boolean
    /** untuk mengisi pg_1, essay_1, */
    // [key:string]: string|number
};

export interface SkorKdResponSiswaType{
    kode_mapel:string,
    data: DataSkorMapel[]
}
export interface DataSkorMapel{
        atp_id:number,
        skor: number
    }
export interface KeyScore {
    index:number,
    skor:number
}
export interface RisponsePenilaianSiswa{
    
    index: number,
    respon: string|null,
    no_prefix: number,
    bentuk_soal:ListBentukSoalType['name'] //ini striing
    // properties ini harus diambil dari data bank soal
    skor?: number,
    atp?: number;//AtpAsOrm,
    soal_id?: number;//BankSoalAppType
}

export interface ResumeInfoResponse extends NilaiSiswaAppType{
    siswa?:SiswaType;
    totalResponValid:number,
    durasiPengerjaan:number
}
export interface detailNilaiSiswaAppType extends ResumeInfoResponse{
    siswa? : SiswaType,
    publikasi:TagihanAsessmenType,
    templateKoreksiSiswa:TemplateKoreksiSiswaType[],
    skorKdSebaran:GroupSebaranNoSoalFromPropertyKurikulumWithScore
    
}

export interface SiswaWithNilaiSiswaAppType{
    siswa: SiswaType,
    // publikasi_id: number,
    currentPublikasi:TagihanHasDataResponse,
    data: ResumeInfoResponse[]
}