import type { PrefixNis } from "./PrefixNis";

export interface RiwayatRaportSiswa{
    tapel:PrefixNis,
    rombelInTapel:string,

}

/** deteksi problem */
export interface ProblemRiwayat{
    isValid:boolean,
    message?:string
}

/** Deteksi Riwayat Siswa */
export interface PredicatableRiwayatRaport{
    prediksiKelas:RiwayatRaportSiswa[],
    // validation:ProblemRiwayat
    isValid:boolean,
    shouldBeFixed?:string[]
}

