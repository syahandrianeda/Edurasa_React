export interface AnalisisPengecohOpsiResult {
    index: number;
    content: string;

    isKunci: boolean;

    jumlahPemilih: number;
    persentasePemilih: number;
    persentasePemilihDariTerjawab: number;

    jumlahKelompokTinggi: number;
    jumlahKelompokRendah: number;

    persentaseKelompokTinggi: number;
    persentaseKelompokRendah: number;

    indeksPengecoh: number;

    berfungsi: boolean;
}

export interface AnalisisPengecohSoalResult {
    soal_id: number;
    no_prefix: number;
    bentuk_soal: string;

    opsi: AnalisisPengecohOpsiResult[];

    kunciIndex: number | null;

    jumlahPeserta: number;
    jumlahTerjawab: number;
    jumlahTidakTerjawab: number;
}

export interface AnalisisPengecohResult {
    publikasi_id: number;

    jumlahPeserta: number;

    soal: AnalisisPengecohSoalResult[];
}