import type { PublikasiPaketAppType } from "~/types/publikasi-paket-soal/publikasi-paket-app-type";
import type { TagihanAsessmenType } from "../tagihan-assesmen-type";

export type RefrensiTabResponTagihanJenjangType = {
    /** respon_id, diambil dari sheet Nilai_<jenjang> tab: `respon_tagihan_<jenjang>  */
    responId: number;
    /** diambil dari kolom `skor_<index> */
    skor: number | null;
    /** bentuk_soal, diambil dari naskah soal/'publikasi_paket' */
    bentukSoal: string;
    /** nomor soal */
    noSoal: number;
    responJawaban: string | null;
    atp_id: number;
    kunciJawabanPg: string;
    dataPublikasi:TagihanAsessmenType
};
