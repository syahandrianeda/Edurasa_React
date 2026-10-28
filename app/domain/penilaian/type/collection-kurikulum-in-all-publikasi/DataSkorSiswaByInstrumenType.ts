import type { RefrensiTabResponTagihanJenjangType } from "./RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "./DataRefrensiPerBentukSoal";
import type { SkorKdType } from "../SkorKdType";
import type { TagihanAsessmenType } from "../tagihan-assesmen-type";

export type DataSkorSiswaByInstrumenType = {
    siswa_id: number;
    namaSiswa: string;
    rombel: string;
    dataRefrensiTabResponTagihanJenjang: RefrensiTabResponTagihanJenjangType[];
    dataSumberPublikasiPaket?: TagihanAsessmenType;
    dataPerBentukSoal: DataRefrensiPerBentukSoal[];
    /** `total` = akumulasi skor pada `RefrensiTabResponTagihanType` */
    total: number;
    /** `countSoal` = jumlah data `RefrensiTabResponTagihanType` */
    countSoal: number;
    /** skor di level ini, adalah perhitungan `total` dibagi `countSoal` dengan 2 angka di belakang koma*/
    skor: number;
    /** skorKd berformat: {<kodeMapel>_<atp_id> : skor} */
    skorKd: SkorKdType;


};
