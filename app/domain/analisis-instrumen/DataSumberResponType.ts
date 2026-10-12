// import type { RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
// import type { SiswaType } from "~/types/siswa";
// import type { KelompokAtasBawah } from "./KelompokAtasBawah";

// export interface DataSumberRespon {
//     soal_id: number;
//     no_prefix: number;
//     bentuk_soal: string;
//     index:number,

//     totalSkor:number,
//     skorSoal:number,
//     skorScalling:number
//     /**
//      * Statistik dasar
//      */
//     jumlahPeserta: number;
//     jumlahTerjawab: number;
//     jumlahTidakTerjawab: number;
//     persentaseTerjawab: number;

// }
// export interface SumberAnalisisResult {
//     siswa: SiswaType;
//     data: DataSumberRespon[];
//     kelompok: KelompokAtasBawah;
// }

// export interface SiswaDanLasDataResponse{
//     siswa:SiswaType,
//     respon:Map<number, RisponsePenilaianSiswa[]>,
//     scoreSiswa:number,
//     kelompok: KelompokAtasBawah;
// }