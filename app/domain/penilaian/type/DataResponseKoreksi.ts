import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { DetailNilaiSiswaUntukKoreksi } from "./DetailNilaiSiswaUntukKoreksi";

export interface DataResponseKoreksi {
    soal: BankSoalAppType;
    no_prefix:number
    respon:DetailNilaiSiswaUntukKoreksi[];
}

