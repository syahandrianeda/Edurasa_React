import type { SiswaType } from "~/types/siswa";
import { resolveAgama, resolveDate, resolveGender, resolveNumber, resolveString } from "./_resolver";
import { Agama } from "~/types/enums/agama";
import { Gender } from "~/types/enums/gender";
import { formatDateSheet, type DateToString } from "~/lib/date-helper";
import { getEnumKey } from "~/lib/get-enum-key";

export type SiswaAppScriptDTO =
  Omit<
    DateToString<SiswaType>,
    'pd_jk' | 'pd_agama'
  > & {
    pd_jk: keyof typeof Gender
    pd_agama: keyof typeof Agama
  }


export class DTOSiswa {
    static fromApi(dto: Record<string, any>): SiswaType {
        return {
                time_stamp: resolveDate(dto.time_stamp ),
                id: resolveNumber(dto.id),
                jenjang: resolveNumber(dto.jenjang),
                nama_rombel: resolveString(dto.nama_rombel),
                nis: resolveString(dto.nis),
                nisn: resolveString(dto.nisn),
                nik: resolveString(dto.nik),
                nokk: resolveString(dto.nokk),
                pd_nama: resolveString(dto.pd_nama),
                pd_jk: resolveGender(dto.pd_jk),
                pd_tl: resolveString(dto.pd_tl),
                pd_tanggallahir: resolveDate(dto.pd_tanggallahir),
                pd_agama: resolveAgama(dto.pd_agama), 
                pd_namaayah: resolveString(dto.pd_namaayah),
                pd_namaibu: resolveString(dto.pd_namaibu),
                pd_alamat: resolveString(dto.pd_alamat),
                pd_hp: resolveString(dto.pd_hp),
                aktif: resolveString(dto.aktif),
                dieditoleh: resolveString(dto.dieditoleh),
                action: resolveString(dto.action),
                usulanperubahandata: resolveString(dto.usulanperubahandata),
                dapo_rt: resolveString(dto.dapo_rt),
                dapo_rw: resolveString(dto.dapo_rw),
                dapo_dusun: resolveString(dto.dapo_dusun),
                dapo_kelurahan: resolveString(dto.dapo_kelurahan),
                dapo_kecamatan: resolveString(dto.dapo_kecamatan),
                dapo_kodepos: resolveString(dto.dapo_kodepos),
                dapo_jenistinggal: resolveString(dto.dapo_jenistinggal),
                dapo_alattransportasi: resolveString(dto.dapo_alattransportasi),
                dapo_telepon: resolveString(dto.dapo_telepon),
                dapo_email: resolveString(dto.dapo_email),
                dapo_skhun: resolveString(dto.dapo_skhun),
                dapo_penerimakps: resolveString(dto.dapo_penerimakps),
                dapo_nokps: resolveString(dto.dapo_nokps),
                dapo_tahunlahirayah: resolveDate(dto.dapo_tahunlahirayah),
                dapo_jenjangpendidikanayah: resolveString(dto.dapo_jenjangpendidikanayah),
                dapo_pekerjaanayah: resolveString(dto.dapo_pekerjaanayah),
                dapo_penghasilanayah: resolveString(dto.dapo_penghasilanayah),
                dapo_nikayah: resolveString(dto.dapo_nikayah),
                dapo_tahunlahiribu: resolveDate(dto.dapo_tahunlahiribu),
                dapo_jenjangpendidikanibu: resolveString(dto.dapo_jenjangpendidikanibu),
                dapo_pekerjaanibu: resolveString(dto.dapo_pekerjaanibu),
                dapo_penghasilanibu: resolveString(dto.dapo_penghasilanibu),
                dapo_nikibu: resolveString(dto.dapo_nikibu),
                dapo_namawali: resolveString(dto.dapo_namawali),
                dapo_tahunlahirwali: resolveDate(dto.dapo_tahunlahirwali),
                dapo_jenjangpendidikanwali: resolveString(dto.dapo_jenjangpendidikanwali),
                dapo_pekerjaanwali: resolveString(dto.dapo_pekerjaanwali),
                dapo_penghasilanwali: resolveString(dto.dapo_penghasilanwali),
                dapo_nikwali: resolveString(dto.dapo_nikwali),
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
                dapo_anakkeberapa: resolveString(dto.dapo_anakkeberapa),
                dapo_lintang: resolveString(dto.dapo_lintang),
                dapo_bujur: resolveString(dto.dapo_bujur),
                dapo_beratbadan: resolveNumber(dto.dapo_beratbadan),
                dapo_tinggibadan: resolveNumber(dto.dapo_tinggibadan),
                dapo_lingkarkepala: resolveNumber(dto.dapo_lingkarkepala),
                dapo_jumlahsaudarakandung: resolveNumber(dto.dapo_jumlahsaudarakandung),
                dapo_jarakrumahkesekolah: resolveNumber(dto.dapo_jarakrumahkesekolah),
                dok_akte: resolveString(dto.dok_akte),
                dok_kk: resolveString(dto.dok_kk),
                dok_kip: resolveString(dto.dok_kip),
                dok_kks: resolveString(dto.dok_kks),
                dok_kpspkh: resolveString(dto.dok_kpspkh),
                dapo_kota: resolveString(dto.dapo_kota),
                dapo_provinsi: resolveString(dto.dapo_provinsi),
                keluar_tgl: resolveDate(dto.keluar_tgl),
                masuk_tgl: resolveDate(dto.masuk_tgl),
                smp_ke: resolveString(dto.smp_ke),
                pindah_ke: resolveString(dto.pindah_ke),
                masuk_dari: resolveString(dto.masuk_dari),
                kelas_keluar: resolveString(dto.kelas_keluar),
                angkatan: resolveString(dto.angkatan),
                riwayat_fisik: resolveString(dto.riwayat_fisik),
                riwayat_penyakit: resolveString(dto.riwayat_penyakit),
                riwayat_tapel: resolveString(dto.riwayat_tapel),
                dapo_wni: resolveString(dto.dapo_wni),
                jumlahsaudaratiri: resolveNumber(dto.jumlahsaudaratiri),
                jumlahsaudaraangkat: resolveNumber(dto.jumlahsaudaraangkat),
                bahasaseharihari: resolveString(dto.bahasaseharihari),
                golongandarah: resolveString(dto.golongandarah),
                hubunganwali: resolveString(dto.hubunganwali),
                kelas_pindah_ke_kelas: resolveString(dto.kelas_pindah_ke_kelas),
                pdb_tgl: resolveDate(dto.pdb_tgl),
                keluar_tgl2: resolveDate(dto.keluar_tgl2),
                namasekolahasaltk: resolveString(dto.namasekolahasaltk),
                noijazahtk: resolveString(dto.noijazahtk),
                tanggalijazahtk: resolveDate(dto.tanggalijazahtk),
                alasan_keluar: resolveString(dto.alasan_keluar),
                tahuninduk: resolveString(dto.tahuninduk),
                tahunindukdate: resolveDate(dto.tahunindukdate),
                awal_kelas: resolveString(dto.awal_kelas),
                dok_kartunisn: resolveString(dto.dok_kartunisn),
                dok_raport: resolveString(dto.dok_raport),
                dok_piagam: resolveString(dto.dok_piagam),
                dok_ijazahsd: resolveString(dto.dok_ijazahsd),
                dok_lainnya: resolveString(dto.dok_lainnya),
                nama_panggilan: resolveString(dto.nama_panggilan),
                koleksi_potoinduk: resolveString(dto.koleksi_potoinduk),
                data_kurikulum: resolveString(dto.data_kurikulum),


        } as SiswaType
    }

    static fromApiArray(dto: Record<string, any>):SiswaType[]{
        
        return dto.map(this.fromApi);
        
    }

    static toAppScript(
        siswa: SiswaType
        ): SiswaAppScriptDTO {

        const result: any = {}

        for (const key in siswa) {
            const value = siswa[key as keyof SiswaType]

            if (value instanceof Date) {
            result[key] = formatDateSheet(value)
            } else {
            result[key] = value
            }
        }

        return {
            ...result,
            // pd_jk: siswa.pd_jk as keyof typeof Gender,
            // pd_agama: siswa.pd_agama as keyof typeof Agama,
            pd_agama: getEnumKey(Agama, siswa.pd_agama),
            pd_jk: siswa.pd_jk === Gender.UNKNOWN ? '' : siswa.pd_jk,

        }
    }
    static toAppScriptArray(dto: Record<string, any>):SiswaType[]{
        return dto.map(this.toAppScript);
    }
}