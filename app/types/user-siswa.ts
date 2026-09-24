import type { AccesUser, User } from ".";
import type { SiswaType } from "./siswa";

export interface UserSiswa extends User{
    nisn: string
    jabatan: string,
    roles: string,
    permission:AccesUser[],
    token: number,
    status: string
    rombel: string,
    checkInType: 'nisn'|'token',
    detail: SiswaType
}

export interface AkunSiswaSheet{
    id: number;
    name: string;
    email: string;
    avatar: string;
    nisn: string
    jabatan: string,
    roles: string,
    permission:string//;//AccesUser[],
    token: number,
    status: string
    rombel: string,

    checkInType: 'nisn'|'token'
    detail: SiswaType
}