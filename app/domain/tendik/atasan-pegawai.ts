import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type"
import { NAMA_SEKOLAH } from "../identitas_aplikasi/identitas-aplikasi"


export type AtasanPegawaiType={
    name:string,
    nip_number:string
    nip:string
    jabatan:string
    tempatDinas:string
    start_at?:Date
    end_at?:Date
}

const KabidPendas:AtasanPegawaiType = {
    name:'Raden Muchamad Zakkya Fauzan, SE.,M.MSi',
    nip_number:'19820721 200501 1 004',
    nip:'NIP. 19820721 200501 1 004',
    jabatan:'Kepala Bidang Pembinaan Sekolah Dasar',
    tempatDinas:'Dinas Pendidikan Kota Depok'
}

export default function AtasanPegawai(type:string, riwayatKepsek:RiwayatAkunAppType[]):AtasanPegawaiType{
    const kepsek = riwayatKepsek.find(s=>s.jabatan === 'Kepala Sekolah');
        
    if(type === 'Kepala Sekolah') return KabidPendas
    
    return {
        name: kepsek?.nama_guru ?? '',
        nip_number: kepsek?.nip ?? '',
        nip:`NIP. ${kepsek?.nip}`,
        jabatan:`Kepala UTPD ${NAMA_SEKOLAH}`,
        tempatDinas:NAMA_SEKOLAH,

    }

}