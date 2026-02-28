import type { AbsensiSiswaSheetType, AbsensiSiswaType, KehadiranType } from "~/types/absensi-siswa";
import type { keteranganLabelKaldik } from "../kaldik/type-output-kaldik";
import type { Gender } from "~/types/enums/gender";

export type dataAbsensiSiswaInBulanType={
    // berguna untu edit profil/data siswa;
    id: number,
    pd_nama: string,
    nis: string,
    nisn: string, 
    koleksi_potoinduk:string,
    pd_jk:Gender,
    //berguna untuk mengetahui siswa aktif di rentang tanggal tertentu
    check_in:Date,
    check_out:Date,
    status: string, // aktif, non-aktif, meninggal-dunia, lulus, pindah, dll
    dataAbsen: dataAbsenBulanan[],
    exist_in_this_month: boolean,
    exist_in_this_start: number
    exist_in_this_end: number
    // perhitungan rekap
    count_hari_efektif: number,
    total_hadir: number,
    total_sakit: number,
    total_ijin: number,
    total_alpa: number,
    persentase_absensi: string;
    persentase_kehadiran: string;
    // identitas bulanannya:
    bulan_name: string, 
    bulan_index: number,
    year: number,
}
export type dataAbsenBulanan = {
    tgl: number,
    date: Date,
    // merefrensi ke data kaldik
    isLibur:boolean
    isHe:boolean,
    isHeb:boolean,
    style?:React.CSSProperties
    // weekInMonth: number,
    // weekInSemester?:number,
    eventYet:boolean,
    keteranganKaldik:keteranganLabelKaldik[]
    // keterangan hadir: merefrensikan ke data absen, tapi dikonsumsi aplikasi
    idbaris_absen?: number,
    nama_di_absen?: string,
    idDate_absen?: string, 
    kehadiran?: string,
    id_image_kehadiran?: string,
    // source?: AbsensiSiswaType
}
export type dataAbsensiRekapSemester={
    // berguna untu edit profil/data siswa;
    id: number,
    pd_nama: string,
    nis: string,
    nisn: string, 
    koleksi_potoinduk:string,
    pd_jk:Gender,
    status:string,
    
    // perhitungan rekap
    count_hari_efektif: number,
    total_hadir: number,
    total_sakit: number,
    total_ijin: number,
    total_alpa: number,
    persentase_absensi: string;
    persentase_kehadiran: string;
    //sumber:
    sumber:sumberRekapAbsen[]
}
export type sumberRekapAbsen = {
        namaBulan:string,
        tahun:number,
        data: dataAbsensiSiswaInBulanType[]
    }

export type dataAbsenToday = {
    // berguna untu edit profil/data siswa;
    id: number,
    pd_nama: string,
    nis: string,
    nisn: string, 
    koleksi_potoinduk:string,
    pd_jk:Gender,
    //berguna untuk mengetahui siswa aktif di rentang tanggal tertentu
    check_in:Date,
    check_out:Date,
    status: string, // aktif, non-aktif, meninggal-dunia, lulus, pindah, dll
    dataAbsen: dataAbsenBulanan,
    today:Date
}
export type dataRekapSIA = {
        tgl:number
        count:number
    }
export type rekapSIAPerTanggal = {
    kehadiran:KehadiranType,
    bulanName?:string,
    data:dataRekapSIA[]
}
export type statistikRekap = {
    dateRefrence:Date,
    namaBulan:string,
    totalHE: number;
    totalSIA: number;
    totalHadir: number;
    persenSIA: string;
    persenHadir: string;
    persenSakit: string;
    persenIjin: string;
    persenAlpa: string;
    totalSakit:number;
    totalIjin :number;
    totalAlpa :number;
}