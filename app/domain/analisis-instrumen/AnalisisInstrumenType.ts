import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { SiswaType } from "~/types/siswa";

export interface AnalisisInstrumenMatrix {
    publikasi_id: number;

    siswa: AnalisisInstrumenMatrixSiswa[];

    soal: AnalisisInstrumenMatrixSoal[];

    skor: number[][];

    respon: (string | null)[][];

    answered: boolean[][];
}

export interface AnalisisInstrumenMatrixSiswa {
    siswa_id: number;
    siswa: SiswaType;

    rowIndex: number;

    totalSkor: number;

    jumlahTerjawab: number;
    jumlahTidakTerjawab: number;

    nilai: number;
}

export interface AnalisisInstrumenMatrixSoal {
    soal_id: number;
    soal: BankSoalAppType;

    columnIndex: number;

    no_prefix: number;
}
