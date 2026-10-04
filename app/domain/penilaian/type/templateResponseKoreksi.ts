import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { DataResponseKoreksi } from "./DataResponseKoreksi";

export interface templateResponseKoreksi {
    bentuk_soal: ListBentukSoalType;
    data: DataResponseKoreksi[];
}
