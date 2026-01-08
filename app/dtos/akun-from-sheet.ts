
import type { AccesUser } from "~/types";
import type { AkunSheet, FriendSheet } from "~/types/akun-sheet";

/**
 * @info memperbaiki type data dari pengambilan data sheet Akun Tab User
 */
export default class DTOSheetUser{
    static fromResponAkun(dto:Record<string,any>):AkunSheet{
        return {
            Time_Stamp:dto.Time_Stamp,
            // username:dto.username,
            // password:dto.password,
            email:dto.email,
            verifikasi:dto.verifikasi,
            id:Number(dto.id),
            sekolah:dto.sekolah,
            kelas:dto.kelas,
            gurukelas_gmp:dto.gurukelas_gmp,
            guru_namalengkap:dto.guru_namalengkap,
            guru_nip:dto.guru_nip,
            kepsek_namalengkap:dto.kepsek_namalengkap,
            kepsek_nip:dto.kepsek_nip,
            idpoto_potoguru:dto.idpoto_potoguru,
            action:dto.action,
            no_wa_user:dto.no_wa_user,
            kelasampu:dto.kelasampu,
            jenjang:dto.jenjang,
            idabsen:Number(dto.idabsen),
            aktif:dto.aktif,
            permission:DTOSheetUser.parsePermission(dto.permission),
            friends:DTOSheetUser.parseFriends(dto.friends),


        }
    }
    
    
    private static parsePermission(raw: any): AccesUser[] {
        if (!raw) return []

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
        return raw.map(this.normalizePermission)
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
            return parsed.map(this.normalizePermission)
            }
        } catch {
            // 3️⃣ CSV / pipe string fallback
            return raw.split(",").map((role, index) => ({
            idbaris: index + 1,
            role: role.trim(),
            permission: "",
            level: "",
            keterangan: "",
            }))
        }
        }

        return []
    }
    private static parseFriends(raw: any): FriendSheet[] {
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

    private static normalizePermission(item: any): AccesUser {
        return {
        idbaris: Number(item.idbaris ?? 0),
        role: String(item.role ?? ""),
        permission: String(item.permission ?? ""),
        level: String(item.level ?? ""),
        keterangan: String(item.keterangan ?? ""),
        }
    }
    private static normalizeFriends(dto: any): FriendSheet {
        return {
        Time_Stamp:dto.Time_Stamp,
            // username:dto.username,
            // password:dto.password,
            email:dto.email,
            verifikasi:dto.verifikasi,
            id:Number(dto.id),
            sekolah:dto.sekolah,
            kelas:dto.kelas,
            gurukelas_gmp:dto.gurukelas_gmp,
            guru_namalengkap:dto.guru_namalengkap,
            guru_nip:dto.guru_nip,
            kepsek_namalengkap:dto.kepsek_namalengkap,
            kepsek_nip:dto.kepsek_nip,
            idpoto_potoguru:dto.idpoto_potoguru,
            action:dto.action,
            no_wa_user:dto.no_wa_user,
            kelasampu:dto.kelasampu,
            jenjang:dto.jenjang,
            idabsen:Number(dto.idabsen),
            aktif:dto.aktif,
        }
    }
}