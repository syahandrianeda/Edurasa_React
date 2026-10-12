import type { StrukturItemInstrumenGlobal } from "~/domain/paket-soal/entities/StrukturItemInstrumenGlobalType";
import type { ListBentukSoalType } from "../bank-soal/bentuk-soal-type";

export interface RisponsePenilaianSiswa extends StrukturItemInstrumenGlobal{
    /**
     * property ini diturunkan dari `StrukturItemInstrumenGlobal
     * =========================================================
        index: number;
        no_prefix: number;
        bentuk_soal: ListBentukSoalType['name']; //ini striing
        atp?: number; //AtpAsOrm,
        soal_id?: number; //BankSoalAppType;
        ============================================
     */
    /**
     property ini [skor, respon] diambil dari respon siswa atau data dari sheet 'nilai_<jenjang>`
     sumbernya bisa dari type `NilaiSiswaAppType['respon`]
        - NilaiSiswaAppType dihasilksan dari `DtoResponTagihanSiswa`;
        - untuk skor, numpang index disini. Bukan skor asli tiap respons
     */
    respon: string | null;
    /** 
     * skor di sini bukan untuk skor tiap dari tiap jawaban respon,  tapi numpang index
     * skor aslii tiap item soal harus dicari berdasarkan struktur naskah pada paket soal yang telah dipublikasikan;
    */
    skor?: number;
}
