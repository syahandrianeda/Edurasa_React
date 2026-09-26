import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";

export default class ResponSiswaTagihanPenilaian{
    constructor(
        private readonly dtoNilaiSiswaApp:NilaiSiswaAppType[],
        // private readonly dtoAtp:
        private readonly bankSoal:BankSoalAppType[],
    ){}


}