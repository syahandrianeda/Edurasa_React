const Aplikasi = import.meta.env.VITE_APP_NAME;
const Versi= import.meta.env.VITE_APP_VERSION;
const NamaSekolah= import.meta.env.VITE_NAME_SCHOOL;
const Pemda = import.meta.env.VITE_INSTANSI_PEMERINTAH
const DinasInduk = import.meta.env.VITE_INSTANSI_OPD
const Kota = import.meta.env.VITE_DAERAH_INDUK


export const NAMA_APLIKASI_VERSION = Aplikasi +' '+Versi;
export const NAMA_APLIKASI = Aplikasi;
export const NAMA_VERSI_APLIKASI = Versi;
export const NAMA_SEKOLAH = NamaSekolah;

export const PEMERINTAH_DAERAH = Pemda
export const KABUPATEN_KOTA = Kota
export const INSTANSI_INDUK = DinasInduk