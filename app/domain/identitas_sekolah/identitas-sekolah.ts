const uptd =  import.meta.env.VITE_UPTD_SHORT;
const namasekolah = import.meta.env.VITE_NAME_SCHOOL;

export const INSTANSI_PEMERINTAH:string = import.meta.env.VITE_INSTANSI_PEMERINTAH;
export const INSTANSI_OPD:string = import.meta.env.VITE_INSTANSI_OPD;
export const IDENTITAS_SEKOLAH:string = uptd +' ' + namasekolah;
export const ALAMAT_JALAN:string = import.meta.env.VITE_ALAMAT_KOP_1;
export const ALAMAT_KECAMATAN:string = import.meta.env.VITE_ALAMAT_KOP_2;
export const ALAMAT_DIGITAL:string = import.meta.env.VITE_ALAMAT_KOP_3;
export const DAERAH_INDUK = import.meta.env.VITE_DAERAH_INDUK