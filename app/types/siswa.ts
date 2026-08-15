import type { Agama } from "./enums/agama";
import type { Gender } from "./enums/gender"

export interface SiswaType{
    time_stamp?:Date,
    id:number,
    jenjang:number,
    nama_rombel:string,
    nis:string,
    nisn:string,
    nik:string,
    nokk:string,
    pd_nama:string,
    pd_jk:Gender,
    pd_tl:string,
    pd_tanggallahir:Date,
    pd_agama:Agama,
    pd_namaayah:string,
    pd_namaibu:string,
    pd_alamat:string,
    pd_hp:string,
    aktif:string,
    dieditoleh:string,
    action:string,
    usulanperubahandata:string,
    dapo_rt:string,
    dapo_rw:string,
    dapo_dusun:string,
    dapo_kelurahan:string,
    dapo_kecamatan:string,
    dapo_kodepos:string,
    dapo_jenistinggal:string,
    dapo_alattransportasi:string,
    dapo_telepon:string,
    dapo_email:string,
    dapo_skhun:string,
    dapo_penerimakps:string,
    dapo_nokps:string,
    dapo_tahunlahirayah:Date,
    dapo_jenjangpendidikanayah:string,
    dapo_pekerjaanayah:string,
    dapo_penghasilanayah:string,
    dapo_nikayah:string,
    dapo_tahunlahiribu:Date,
    dapo_jenjangpendidikanibu:string,
    dapo_pekerjaanibu:string,
    dapo_penghasilanibu:string,
    dapo_nikibu:string,
    dapo_namawali:string,
    dapo_tahunlahirwali:Date,
    dapo_jenjangpendidikanwali:string,
    dapo_pekerjaanwali:string,
    dapo_penghasilanwali:string,
    dapo_nikwali:string,
    dapo_nopesertaujiannasional:string,
    dapo_noseriijazah:string,
    dapo_penerimakip:string,
    dapo_nomorkip:string,
    dapo_namadikip:string,
    dapo_nomorkks:string,
    dapo_noregistrasiaktalahir:string,
    dapo_bank:string,
    dapo_nomorrekeningbank:string,
    dapo_rekeningatasnama:string,
    dapo_layakpip:string,
    dapo_alasanlayakpip:string,
    dapo_kebutuhankhusus:string,
    dapo_sekolahasal:string,
    dapo_anakkeberapa:string,
    dapo_lintang:string,
    dapo_bujur:string,
    dapo_beratbadan:number,
    dapo_tinggibadan:number,
    dapo_lingkarkepala:number,
    dapo_jumlahsaudarakandung:number,
    dapo_jarakrumahkesekolah:number,
    dok_akte:string,
    dok_kk:string,
    dok_kip:string,
    dok_kks:string,
    dok_kpspkh:string,
    dapo_kota:string,
    dapo_provinsi:string,
    keluar_tgl:Date,
    masuk_tgl:Date,
    smp_ke:string,
    pindah_ke:string,
    masuk_dari:string,
    kelas_keluar:string,
    angkatan:string,
    riwayat_fisik:string,
    riwayat_penyakit:string,
    riwayat_tapel:string,
    dapo_wni:string,
    jumlahsaudaratiri:number,
    jumlahsaudaraangkat:number,
    bahasaseharihari:string,
    golongandarah:string,
    hubunganwali:string,
    kelas_pindah_ke_kelas:string,
    pdb_tgl:Date,
    keluar_tgl2:Date,
    namasekolahasaltk:string,
    noijazahtk:string,
    tanggalijazahtk:Date,
    alasan_keluar:string,
    tahuninduk:string,
    tahunindukdate:Date,
    awal_kelas:string,
    dok_kartunisn:string,
    dok_raport:string,
    dok_piagam:string,
    dok_ijazahsd:string,
    dok_lainnya:string,
    nama_panggilan:string,
    koleksi_potoinduk:string,
    data_kurikulum:string,



}

// types/status.ts
export type StatusAktif =
    'aktif'
    | 'lulus'
    | 'pindah'
    | 'meninggal dunia'
    | 'non-aktif' ;

export interface WithStatusAktif {
    aktif?: StatusAktif
}

export interface OrangTuaType{
    nama_ayah:string, 
    nama_ibu:string
}
export interface TtlType{
    tempat:string,
    tgl_lahir:Date,
    ttl:string
}
export interface InfoPersonalSiswa extends SiswaType{
    tempat_tanggal_lahir?:TtlType,
    orang_tua?:OrangTuaType
    rombel?:string
    no_ijazah?:string
    no_transkip?:string

}