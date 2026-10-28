import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";


export type DataSoalNaskah = {
    bentukSoal: ListBentukSoalType;
    koleksiNoSoal: number[];
    koleksiJawaban: string[];
};
