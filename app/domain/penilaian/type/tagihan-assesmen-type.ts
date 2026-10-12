import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { detailNilaiSiswaAppType, NilaiSiswaAppType, SiswaWithNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { SiswaType } from "~/types/siswa";
import type { DetailTarget } from "./DetailTarget";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { GroupSebaranNoSoalFromPropertyKurikulum } from "../model/grouping-kurikulum-by-bentuksoal";
import type { templateResponseKoreksi } from "./templateResponseKoreksi";
import type { Data_response_bySiswaType } from "./Data_response_bySiswaType";

/** 
 * @info type ini sebenarnya salinan/tiruan dari PublikasiPaketAppType
 * Digunakan untuk kerpeluan prosessing dan kalkulasi terhadap data/tipe data lain
 */
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
    data_respons        : detailNilaiSiswaAppType[];//NilaiSiswaAppType[];//ResponsTagihan[]
    koleksi_mapelName   : string[],
    kurikulum_tagihan   : AtpHasManySoalType[],
    peserta             : SiswaType[],
    total_instrumen     : number,
    bank_soal_collections: (BankSoalAppType|undefined)[],
    sebaran_kurikulum_by_bentuk_soal: GroupSebaranNoSoalFromPropertyKurikulum,
    // templateKoreksi : templateResponseKoreksi[]
    data_response_bySiswa : Data_response_bySiswaType[]//{siswa:SiswaType, data:detailNilaiSiswaAppType[]}
    jumlahPerespon      :number,
    jumlahDuplikat      :number
    
}

