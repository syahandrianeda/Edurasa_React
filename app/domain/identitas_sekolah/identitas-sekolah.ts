const uptd =  import.meta.env.VITE_UPTD_SHORT;
const namasekolah = import.meta.env.VITE_NAME_SCHOOL;

export const INSTANSI_PEMERINTAH:string = import.meta.env.VITE_INSTANSI_PEMERINTAH;
export const INSTANSI_OPD:string = import.meta.env.VITE_INSTANSI_OPD;
export const NSS_SEKOLAH:number = import.meta.env.VITE_NSS;
export const NPSN_SEKOLAH:number= import.meta.env.VITE_NPSN;
export const KODEPOS_SEKOLAH:number= import.meta.env.VITE_KODEPOS;
export const IDENTITAS_SEKOLAH:string = uptd +' ' + namasekolah;
export const ALAMAT_JALAN:string = import.meta.env.VITE_ALAMAT_KOP_1;
export const ALAMAT_KECAMATAN:string = import.meta.env.VITE_ALAMAT_KOP_2;
export const KELURAHAN_SEKOLAH:string = import.meta.env.VITE_KELURAHAN;
export const KECAMATAN_SEKOLAH:string = import.meta.env.VITE_KECAMATAN;
export const PROVINSI_SEKOLAH:string = import.meta.env.VITE_PROVINSI;
export const EMAIL_SEKOLAH:string = import.meta.env.VITE_EMAIL;
export const WEB_SEKOLAH:string = import.meta.env.VITE_WEB;
export const ALAMAT_DIGITAL:string = import.meta.env.VITE_ALAMAT_KOP_3;
export const DAERAH_INDUK = import.meta.env.VITE_DAERAH_INDUK

export const UPTD_NAMASEKOLAH:string = uptd +' '+ namasekolah