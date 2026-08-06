export interface RiwayatAkunAppType{
    idbaris: number,
    user_id: number,
    nama_guru: string,
    jabatan: string,
    type_ptk:string, 
    start_tgl?: Date,
    end_tgl?: Date,
    nip: string,
    tgl_nip_start?: Date,
    asn: string,
}