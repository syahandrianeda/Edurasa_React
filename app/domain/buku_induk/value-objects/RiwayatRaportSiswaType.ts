import type { PrefixNis } from "./PrefixNis";

export interface RiwayatRaportSiswa{
    tapel:PrefixNis,

    rombelInTapel:string,

    // data:DataRaportInduk
    // detected: ProblemRiwayat

}

/** deteksi problem */
export interface ProblemRiwayat{
    isValid:boolean,
    message?:string
}

/** Deteksi Riwayat Siswa */
export interface PredicatableRiwayatRaport{
    riwayat:RiwayatRaportSiswa[],
    validation:ProblemRiwayat
}

