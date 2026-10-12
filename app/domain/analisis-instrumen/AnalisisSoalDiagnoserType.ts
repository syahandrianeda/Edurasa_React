export type TingkatKesukaranDiagnosis =
    | 'sulit'
    | 'sedang'
    | 'mudah'
    | 'tidak_dapat_ditentukan';

export type DayaPembedaDiagnosis =
    | 'sangat_rendah'
    | 'rendah'
    | 'cukup'
    | 'baik'
    | 'tidak_dapat_ditentukan';

export type StatusDiagnosisSoal =
    | 'baik'
    | 'cukup'
    | 'perlu_ditinjau'
    | 'bermasalah'
    | 'tidak_dapat_dianalisis';

export interface DiagnosisPengecoh {
    jumlahPengecoh: number;
    jumlahBerfungsi: number;
    jumlahTidakBerfungsi: number;
    jumlahBermasalah: number;
    persentaseBerfungsi: number;
}

export interface DiagnosisSoalResult {
    soal_id: number;
    no_prefix: number;
    bentuk_soal: string;

    tingkatKesukaran:
        TingkatKesukaranDiagnosis;

    dayaPembeda:
        DayaPembedaDiagnosis;

    korelasiItemTotal:
        number | null;

    pengecoh:
        DiagnosisPengecoh | null;

    status:
        StatusDiagnosisSoal;

    alasan: string[];
}

export interface DiagnosisInstrumenResult {
    publikasi_id: number;
    jumlahPeserta: number;
    jumlahSoal: number;

    soal: DiagnosisSoalResult[];
}