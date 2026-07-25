import type { DataRekapBulanan } from "./data-rekap-bulanan-type";

export interface RekapBulananPerKelas {
    siswa_id: number;
    nama_siswa: string;
    data_perbulan: DataRekapBulanan[];
    total: number;
}
