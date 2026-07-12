export type OpsiSoal = {
    kode: string;
    isi: string;
};

export type Soal = {
    indikator_soal: string;
    soal: string;
    opsi: OpsiSoal[];
    jawaban: string;
    lainnya:string,
    lk:string,
    tp:string,
};