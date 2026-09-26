import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { SiswaType } from "~/types/siswa";


export interface TagihanAsessmenType{
    // property ini turunan dari PublikasiPaketAppType:
    idbaris             : number,
    paket_soal_id	    : number,
    start_time          : Date,
    end_time	        : Date, 
    durasi              : number,
    target_type         : TypePaketSoal,
    target_person       : number[],
    target_rombel       : string[],
    status              : string,
    id_file_setting     : string,
    id_bank_soal        : number[],
    nama_publikasi      : string,
    oleh                : string
    
    //property ini turunanan, diubah dari type PublkasiPaketAppType
    /** turunan dari PublikasiPaketAppType['jenis_tagihan']:string --> JenisTagihanPenilaianType */
    jenis_tagihan       : JenisTagihanPenilaiantype,

    /** turunan dari PublikasiPaketAppType[json_setting]:PraSettingBaku --> PraSettingPaket */
    setting_tagihan?    : PraSettingPaket,

    /** jika id_file_setting pada PublkasiPaketApp['id_file_setting'] berbeda dengan id_file pada PaketSoalAppType['id_file_json']:DesignPaketSoal */
    is_validPaketSoal   : boolean;

    /** id_file paket berasal dari data PaketSoal, PaketSoalAppType["id_file_json"] */
    id_file_paket       : string

    /** jika paket_soal_id === 0, maka tagihan ini tidak dibuatkan paket soalnya. Siswa tidak mengerjakan soal */
    source              : 'Paket Soal'|'Non Paket Soal'

}

export interface TagihanHasDataResponse extends TagihanAsessmenType{
    isMultiple          : boolean,
    detail_target       : DetailTarget[];
    data_respons        : NilaiSiswaAppType[];//ResponsTagihan[]
    koleksi_mapelName   : string[],
    kurikulum_tagihan   : AtpHasManySoalType[],
    peserta             : SiswaType[],
    total_instrumen     : number
}
export interface DetailTarget{
    rombel:string,
    data_siswa:SiswaType[],
    count:number;
    current_rombel:boolean
}

interface ResponsTagihan{
    idbaris         : number,
    tokensiswa      : number,
    tagihan_id      : number,
    nilai           : NilaiTagihan[];
}

interface NilaiTagihan{
    no_soal     : number,
    index_soal  : number
    atp_id      : number,
    skor        : number,

}