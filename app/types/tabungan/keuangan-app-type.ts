export interface KeuanganAppType{
    idbaris:number;
    time_stamp: Date,
    penginput: string,
    siswa_id?: number,
    nama_siswa?: string,
    masuk?: number,
    keluar?: number,
    status: string,
    kategori: string,
    keterangan: string,
    snapshot?: SnapshotKeuangan[],

}
export interface SnapshotKeuangan{
    time_stamp:Date,
    penginput:string,
    kategori:string,
    keterangan:string,
    nominal:number
    kolom:keyof KeuanganAppType
    status:string
}
export interface UIJumlahKeuanganApp extends KeuanganAppType{
    saldo:number
}