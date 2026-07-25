import type { transaksi_tabungan } from "./transaksi-tabungan-type";

export interface DataRekapBulanan {
    nama_bulan: string;
    index_bulan:number;
    data_transaksi: transaksi_tabungan[];
    total_tabungan: number;
}
