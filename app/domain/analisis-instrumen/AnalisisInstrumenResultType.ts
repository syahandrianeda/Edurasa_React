export interface AnalisisInstrumenSoalResult {
    soal_id: number;
    no_prefix: number;
    bentuk_soal: string;

    jumlahPeserta: number;
    jumlahTerjawab: number;
    jumlahTidakTerjawab: number;
    persentaseTerjawab: number;

    meanSkor: number;
    proporsiSkor: number;
    tingkatKesukaran: number;

    korelasiItemTotal: number | null;
}

export interface AnalisisInstrumenResultDetail {
    publikasi_id: number;
    jumlahPeserta: number;
    jumlahSoal: number;

    soal: AnalisisInstrumenSoalResult[];
}
import type { AnalisisPengecohSoalResult } from "./AnalisisPengecohOpsiResult";
import type {
    AnalisisInstrumenSummary
} from "./AnalisisInstrumenSummaryType";
import type {
    TingkatKesukaranDiagnosis,
    DayaPembedaDiagnosis,
    StatusDiagnosisSoal,
} from "./AnalisisSoalDiagnoserType";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { DataSumberResult } from "./DataSumberResult";


export interface AnalisisInstrumenSoalResult {
    soal_id: number;
    no_prefix: number;
    bentuk_soal: string;

    jumlahPeserta: number;
    jumlahTerjawab: number;
    jumlahTidakTerjawab: number;
    persentaseTerjawab: number;

    meanSkor: number;
    proporsiSkor: number;
    tingkatKesukaran: number;

    korelasiItemTotal: number | null;
}


export interface AnalisisInstrumenResultDetail {
    publikasi_id: number;
    jumlahPeserta: number;
    jumlahSoal: number;

    soal: AnalisisInstrumenSoalResult[];
}


/**
 * ==========================================================
 * HASIL FINAL PER SOAL
 * ==========================================================
 */

export interface AnalisisInstrumenSoalFinal {
    soal_id: number;
    no_prefix: number;
    bentuk_soal: string;

    /**
     * Statistik dasar
     */
    jumlahPeserta: number;
    jumlahTerjawab: number;
    jumlahTidakTerjawab: number;
    persentaseTerjawab: number;

    meanSkor: number;
    proporsiSkor: number;
    tingkatKesukaran: number;

    /**
     * Daya pembeda / korelasi
     */
    korelasiItemTotal: number | null;

    /**
     * Analisis pengecoh.
     *
     * null untuk soal yang bukan PG Tunggal
     * atau ketika data pengecoh tidak tersedia.
     */
    pengecoh: AnalisisPengecohSoalResult | null;

    /**
     * Diagnosis
     */
    tingkatKesukaranDiagnosis:
        TingkatKesukaranDiagnosis;

    dayaPembeda:
        DayaPembedaDiagnosis;

    status:
        StatusDiagnosisSoal;

    alasan: string[];
}


/**
 * ==========================================================
 * HASIL FINAL ANALISIS INSTRUMEN
 * ==========================================================
 */

export interface AnalisisInstrumenResult {
    publikasi_id: number;
    publikasi: TagihanHasDataResponse, 
    jumlahPeserta: number;
    jumlahSoal: number;
    
    soal: AnalisisInstrumenSoalFinal[];
    
    summary: AnalisisInstrumenSummary;
    sumberData:DataSumberResult[],
}


