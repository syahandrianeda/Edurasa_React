export interface DistribusiDiagnosis {
    sulit: number;
    sedang: number;
    mudah: number;
    tidakDapatDitentukan: number;
}

export interface DistribusiDayaPembeda {
    sangatRendah: number;
    rendah: number;
    cukup: number;
    baik: number;
    tidakDapatDitentukan: number;
}

export interface DistribusiStatusSoal {
    baik: number;
    cukup: number;
    perluDitinjau: number;
    bermasalah: number;
    tidakDapatDianalisis: number;
}

export type KategoriReliabilitas =
    | 'sangat_baik'
    | 'baik'
    | 'cukup'
    | 'rendah'
    | 'sangat_rendah'
    | 'tidak_dapat_ditentukan';

export interface ReliabilitasInstrumen {
    cronbachAlpha: number | null;
    kategori: KategoriReliabilitas;
    jumlahPeserta: number;
    jumlahItem: number;
}

export interface RekomendasiInstrumen {
    jumlahDipertahankan: number;
    jumlahPerluDitinjau: number;
    jumlahBermasalah: number;

    persentaseDipertahankan: number;

    pesan: string[];
}

export interface AnalisisInstrumenSummary {
    publikasi_id: number;

    jumlahPeserta: number;
    jumlahSoal: number;

    tingkatKesukaran: DistribusiDiagnosis;

    dayaPembeda: DistribusiDayaPembeda;

    statusSoal: DistribusiStatusSoal;

    reliabilitas: ReliabilitasInstrumen;

    rekomendasi: RekomendasiInstrumen;
}