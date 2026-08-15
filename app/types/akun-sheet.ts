import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { AccesUser, UserPtk } from ".";
import type { TtlType } from "./siswa";

export interface CredentialSheet{
    username:string, 
    password:string
}
export interface AkunSheet{
    Time_Stamp:string,
    // username:string,
    // password:string,
    email:string,
    verifikasi:string,
    id:number,
    sekolah:string,
    kelas:string,
    gurukelas_gmp:string,
    guru_namalengkap:string,
    guru_nip:string,
    kepsek_namalengkap:string,
    kepsek_nip:string,
    idpoto_potoguru:string,
    action:string,
    no_wa_user:string,
    kelasampu:string,
    jenjang:string,
    idabsen:number,
    aktif:string,
    permission:AccesUser[],
    friends:FriendSheet[]

}
export interface FriendSheet{
    Time_Stamp:string,
        // username:string,
        // password:string,
        email:string,
        verifikasi:string,
        id:number,
        sekolah:string,
        kelas:string,
        gurukelas_gmp:string,
        guru_namalengkap:string,
        guru_nip:string,
        kepsek_namalengkap:string,
        kepsek_nip:string,
        idpoto_potoguru:string,
        action:string,
        no_wa_user:string,
        kelasampu:string,
        jenjang:string,
        idabsen:number,
        aktif:string,
}


export interface InfoPersonalPtk extends IdAkunDanPangkat{
    gol_ruang?:string,
    pangkat?:string,
    status_ptk?:string,
    pangkat_gol_ruang?:string

}