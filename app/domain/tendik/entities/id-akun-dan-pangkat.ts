import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type"

export interface IdAkunDanPangkat{
    idbaris                     : number,          
    user_id                     : number,          
    nama_guru                   : string,
    nip                         : string,
    jabatan                     : string,
    start_at_school?             : Date,
    end_at_school?              : Date,
    asn                         : string,           
    duk                         : number|null,   
    current_golongan_pangkat?    : PangkatGolonganAppType,
    riwayat_golongan_pangkat    : PangkatGolonganAppType[]
}