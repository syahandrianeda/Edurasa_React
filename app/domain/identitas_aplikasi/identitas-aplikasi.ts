const Aplikasi = import.meta.env.VITE_APP_NAME;
const Versi= import.meta.env.VITE_APP_VERSION;
const NamaSekolah= import.meta.env.VITE_NAME_SCHOOL;

export const NAMA_APLIKASI_VERSION = Aplikasi +' '+Versi;
export const NAMA_APLIKASI = Aplikasi;
export const NAMA_VERSI_APLIKASI = Versi;
export const NAMA_SEKOLAH = NamaSekolah