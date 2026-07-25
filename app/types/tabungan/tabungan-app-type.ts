export interface TabunganAppType{
    idbaris:number;
    time_stamp: Date,
    penginput: string,
    siswa_id?: number|null,
    nama_siswa?: string,
    masuk?: number,
    keluar?: number,
    status: string,
    kategori: string,
    keterangan: string,
    snapshot?: SnapshotTabungan[],

}
export interface SnapshotTabungan{
    time_stamp:Date,
    penginput:string,
    kategori:string,
    keterangan:string,
    nominal:number
    kolom:keyof TabunganAppType
    status:string
}
export interface UIJumlahTabunganApp extends TabunganAppType{
    saldo:number,
    totalSnapshot?:number
}