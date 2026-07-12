import type { SiswaDapodikAppToSheet, SiswaDapodikSheetToApp } from "~/types/siswa-dapodik";
import { extractKelasKode, resolveAgama, resolveDate, resolveNumber, resolveString } from "./_resolver";
import { Gender } from "~/types/enums/gender";


export class DTOSiswaDapodikSheetToApp {
    static fromSheet(dto: Record<string, any>): SiswaDapodikSheetToApp {
        
        return {
                index: resolveNumber(dto.index),
                pd_nama: resolveString(dto.pd_nama),
                nis: resolveString(dto.nis),
                pd_jk: dto.pd_jk === Gender.UNKNOWN ? '' : dto.pd_jk,
                nisn: resolveString(dto.nisn),
                pd_tl: resolveString(dto.pd_tl),
                pd_tanggallahir: resolveDate(dto.pd_tanggallahir),
                nik: resolveString(dto.nik),
                pd_agama: resolveAgama(dto.pd_agama), 
                pd_alamat: resolveString(dto.pd_alamat),
                dapo_rt: resolveString(dto.dapo_rt),
                dapo_rw: resolveString(dto.dapo_rw),
                dapo_dusun: resolveString(dto.dapo_dusun),
                dapo_kelurahan: resolveString(dto.dapo_kelurahan),
                dapo_kecamatan: resolveString(dto.dapo_kecamatan),
                dapo_kodepos: resolveString(dto.dapo_kodepos),
                dapo_jenistinggal: resolveString(dto.dapo_jenistinggal),
                dapo_alattransportasi: resolveString(dto.dapo_alattransportasi),
                dapo_telepon: resolveString(dto.dapo_telepon),
                pd_hp: resolveString(dto.pd_hp),
                dapo_email: resolveString(dto.dapo_email),
                dapo_skhun: resolveString(dto.dapo_skhun),
                dapo_penerimakps: resolveString(dto.dapo_penerimakip),
                dapo_nokps: resolveString(dto.dapo_nokps),
                pd_namaayah: resolveString(dto.pd_namaayah),
                dapo_tahunlahirayah: resolveNumber(dto.dapo_tahunlahirayah),
                dapo_jenjangpendidikanayah: resolveString(dto.dapo_jenjangpendidikanayah),
                dapo_pekerjaanayah: resolveString(dto.dapo_pekerjaanayah),
                dapo_penghasilanayah: resolveString(dto.dapo_penghasilanayah),
                dapo_nikayah: resolveString(dto.dapo_nikayah),
                pd_namaibu: resolveString(dto.pd_namaibu),
                dapo_tahunlahiribu: resolveNumber(dto.dapo_tahunlahiribu),
                dapo_pendidikanibu: resolveString(dto.dapo_jenjangpendidikanibu),
                dapo_pekerjaanibu: resolveString(dto.dapo_pekerjaanibu),
                dapo_penghasilanibu: resolveString(dto.dapo_penghasilanibu),
                dapo_nikibu: resolveString(dto.dapo_nikibu),
                dapo_namawali: resolveString(dto.dapo_namawali),
                dapo_tahunlahirwali: resolveNumber(dto.dapo_tahunlahirwali),
                dapo_pendidikanwali: resolveString(dto.dapo_jenjangpendidikanwali),
                dapo_pekerjaanwali: resolveString(dto.dapo_pekerjaanwali),
                dapo_penghasilanwali: resolveString(dto.dapo_penghasilanwali),
                dapo_nikwali: resolveString(dto.dapo_nikwali),
                nama_rombel: extractKelasKode(dto.nama_rombel)??dto.nama_rombel,
                dapo_nopesertaujiannasional: resolveString(dto.dapo_nopesertaujiannasional),
                dapo_noseriijazah: resolveString(dto.dapo_noseriijazah),
                dapo_penerimakip: resolveString(dto.dapo_penerimakip),
                dapo_nomorkip: resolveString(dto.dapo_nomorkip),
                dapo_namadikip: resolveString(dto.dapo_namadikip),
                dapo_nomorkks: resolveString(dto.dapo_nomorkks),
                dapo_noregistrasiaktalahir: resolveString(dto.dapo_noregistrasiaktalahir),
                dapo_bank: resolveString(dto.dapo_bank),
                dapo_nomorrekeningbank: resolveString(dto.dapo_nomorrekeningbank),
                dapo_rekeningatasnama: resolveString(dto.dapo_rekeningatasnama),
                dapo_layakpip: resolveString(dto.dapo_layakpip),
                dapo_alasanlayakpip: resolveString(dto.dapo_alasanlayakpip),
                dapo_kebutuhankhusus: resolveString(dto.dapo_kebutuhankhusus),
                dapo_sekolahasal: resolveString(dto.dapo_sekolahasal),
                dapo_anakkeberapa: resolveNumber(dto.dapo_anakkeberapa),
                dapo_lintang: resolveString(dto.dapo_lintang),
                dapo_bujur: resolveString(dto.dapo_bujur),
                nokk: resolveString(dto.nokk),
                dapo_beratbadan: resolveNumber(dto.dapo_beratbadan),
                dapo_tinggibadan: resolveNumber(dto.dapo_tinggibadan),
                dapo_lingkarkepala: resolveNumber(dto.dapo_lingkarkepala),
                dapo_jumlahsaudarakandung: resolveNumber(dto.dapo_jumlahsaudarakandung),
                dapo_jarakrumahkesekolah: resolveNumber(dto.dapo_jarakrumahkesekolah)


        } 
    }

    static fromSheetArray(dto: Record<string, any>):SiswaDapodikSheetToApp[]{
        
        return dto.map(this.fromSheet);
        
    }
}