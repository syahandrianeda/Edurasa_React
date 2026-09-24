import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import urlImgDrive from "~/lib/url-img-drive";
import type { UserFriends, UserPtk } from "~/types";
import type { InfoPersonalPtk } from "~/types/akun-sheet";
import type { AkunSiswaSheet, UserSiswa } from "~/types/user-siswa";
import { DTOSiswa } from "./dto-siswa";


/**
 * @info Mengubah type data dari sheet Akun Tab User ke type Data aplikasi UserPTK
 */
export default class DTOUserSiswa{
    static fromResponAkun(dto:AkunSiswaSheet):UserSiswa{
        return {
            id              : Number(dto.id),
            name            : dto.name,
            email           : dto.email,
            avatar          : dto.avatar? urlImgDrive(dto.avatar): undefined,
            nisn            : dto.nisn,
            jabatan         : dto.jabatan,
            roles           : dto.roles,
            permission      : Array.isArray(dto.permission)?dto.permission:[],
            token           : Number(dto.token),
            status          : dto.status,
            rombel          : dto.rombel,
            checkInType     : dto.checkInType, //'nisn'|'token'
            detail          : DTOSiswa.fromApi(dto.detail)
            // id: Number(dto.id),
            // name: dto.guru_namalengkap,
            // email: dto.email,
            // sekolah: dto.sekolah,
            // kepsek_name: dto.kepsek_namalengkap,
            // kepsek_nip: dto.kepsek_nip,
            // avatar: dto.idpoto_potoguru ? urlImgDrive(dto.idpoto_potoguru) : undefined,
            // jabatan: dto.gurukelas_gmp,
            // nip: dto.guru_nip,
            // kelas_ampu: dto.kelasampu.split(','),
            // kode_mapel_ampu: dto.kelas,
            // roles: dto.gurukelas_gmp,
            // permission: dto.permission,
            // friends: DTOUser.parseFriends(dto.friends),
        }
    }
    
    private static parseFriends(raw: any): UserFriends[] {
        if (!raw) return []

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
        return raw.map(this.normalizeFriends)
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
            return parsed.map(this.normalizeFriends)
            }
        } catch {
            // 3️⃣ CSV / pipe string fallback
            return []
        }
        }

        return []
    }
    
    private static normalizeFriends(dto: any): UserFriends {
        return {
            id: Number(dto.id),
            name: dto.guru_namalengkap,
            email: dto.email,
            sekolah: dto.sekolah,
            kepsek_name: dto.kepsek_namalengkap,
            kepsek_nip: dto.kepsek_nip,
            avatar: dto.idpoto_potoguru ? urlImgDrive(dto.idpoto_potoguru) : undefined,
            jabatan: dto.gurukelas_gmp,
            nip: dto.guru_nip,
            kelas_ampu: dto.kelasampu.split(','),
            kode_mapel_ampu: dto.kelas,
            roles: dto.gurukelas_gmp,
        }
    }

    static normalizeInfoPersonalPtk(data:IdAkunDanPangkat):InfoPersonalPtk{
        return {
            ...data,
            gol_ruang: data.current_golongan_pangkat?.golongan +'/'+ data.current_golongan_pangkat?.ruang,
            pangkat: data.current_golongan_pangkat?.pangkat,
            status_ptk: data.asn,
            pangkat_gol_ruang: data.current_golongan_pangkat?.pangkat +'-'+ data.current_golongan_pangkat?.golongan +'/'+ data.current_golongan_pangkat?.ruang,
        }
    }
    static arrayNormalizeInfoPersonalPtk(data:IdAkunDanPangkat[]):InfoPersonalPtk[]{
        return data.map(this.normalizeInfoPersonalPtk);
    }
}