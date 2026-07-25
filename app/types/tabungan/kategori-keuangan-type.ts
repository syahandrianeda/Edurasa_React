export interface KategoriKeuanganSheetType{
    idbaris: number,
    user_id?: number|null,
    nama_user:string,
    kategori: string,
    akses_kelas: string,
}

export interface KategoriKeuanganAppType{
    idbaris: number,
    user_id: number|null,
    nama_user:string,
    kategori: string,
    akses_kelas: string[],
}
