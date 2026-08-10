export interface PangkatGolonganAppType{
        idbaris: number,
        user_id: number,
        nama_user: string,
        pangkat: string,
        golongan: string,
        ruang: string,
        start_at?: Date,
        end_at?: Date,
        asn: string,
        daftar_pangkat_id?:number
}