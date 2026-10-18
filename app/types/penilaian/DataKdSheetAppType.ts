import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";

export interface DataKdSheetApp {
    /**source kolom key */
    kolomKey: string
    /** kategori */
    kategoriAssesmen: KategoriTagihanType;
    /** contoh key asal: 'PTS_PKN_31_5` atau `Praktek_BINDO_245_13`, `jenisTagiihan` contohnya 'PTS' atau `Praktek` */
    jenisTagihan: JenisTagihanPenilaiantype['kode'];

    /** contoh key asal: 'PTS_PKN_31_5` atau `Praktek_BINDO_245_13`, `kodeMapelKey` contohnya 'PKN' atau `BINDO` */
    kodeMapelKey: string;

    /** contoh key asal: 'PTS_PKN_31_5` atau `Praktek_BINDO_245_13`, `atp_id` contohnya '31' atau `245` */
    atp_id: number;

    /** contoh key asal: 'PTS_PKN_31_5` atau `Praktek_BINDO_245_13`, `skorKdKey` contohnya 'PKN_31' atau `PKN_245` */
    skorKdKey: string;

    /** contoh key asal: 'PTS_PKN_31_5` atau `Praktek_BINDO_245_13`, `publikasi_id` diambil dari angka terakhir contohnya '5' atau `13` */
    publikasi_id: number;
    /** skor adalah nilai yang ada di sheet */
    skor: number|null;
}
