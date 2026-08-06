import { useMemo } from "react"
import { useAppSelector } from "~/context-reduct/hook"
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector"
import AtasanPegawai from "~/domain/tendik/atasan-pegawai"

export type AtasanType=
| "Kepala Sekolah" 
| "Guru Kelas"
| "Guru Mapel"
| "admin"
| "Operator Sekolah"
| "Staff"
| "ptk"
| "pppk"
| "pppk pw"
| "TU";

export default function useDataAtasan(
    Tgl:Date,
    type:AtasanType
){
    const riwayatAkunAktifByTgl =useAppSelector(InstanceRiwayatIdAkun).getAkunAktifInDate(Tgl)
    return useMemo(()=>AtasanPegawai(type,riwayatAkunAktifByTgl),[type, riwayatAkunAktifByTgl])
}