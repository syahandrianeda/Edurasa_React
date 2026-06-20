import type { PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "./bentuk-soal-type";

export interface BankSoalSheetType{
    idbaris:number,
    fase_jenjang:string,
    jenjang_khusus:number,
    kurikulum:string,
    kode_mapel:string,
    mapel_name:string,
    kd_id:number,
    kd_deskripsi:string,
    bentuk_soal:string,
    materi_pokok:string,
    indikator_soal:string,
    lk:string,
    ruang_lingkup:string,
    stimulus:string,
    pertanyaan:string,
    jawaban:string,
    pembahasan_penskoran:string,
    json_alat_jawab:string,
    snapshot_kurikulum:string,
    oleh:string,
    refrensi:string,

};

export interface BankSoalAppType{
    idbaris:number,
    fase_jenjang:number[],
    jenjang_khusus:number,
    kurikulum:string,
    kode_mapel:string,
    mapel_name:string,
    kd_id:number,
    kd_deskripsi:string,
    bentuk_soal:string,
    materi_pokok:string,
    indikator_soal:string,
    lk:string,
    ruang_lingkup:string,
    stimulus:string,
    pertanyaan:string,
    jawaban:string|number|string[]|number[],
    pembahasan_penskoran:string,
    json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    snapshot_kurikulum?:SnapshotAtpType,
    oleh:string,
    refrensi:string,
}
export interface SnapshotAtpType{
    atp_description:string,
    atp_id:number,
    tp_description:string,
    tp_id:number,
    cp_description:string,
    cp_id:number,
    kelas:number[],
    kodemapel:string;
    fase:string
}

