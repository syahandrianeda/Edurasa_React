import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";

export type AlertPaketSoal = {
    isValid:boolean;
    message:string[];
}
export function ValidationPaketSoal(data:PaketSoalDesign):AlertPaketSoal{
    let isValid = true;
    const message:string[]=[];
    
    /** dari setingt */
    if(!data.setting){
        isValid = false
        message.push('Setting Paket Soal belum diatur')
    }
    if(!data.setting?.identitas?.nama){
        isValid = false,
        message.push('Paket Soal belum diberi nama');
    }
    if(!data.setting?.count_bentuk_soal || data.setting?.count_bentuk_soal.length === 0){
        isValid = false;
        message.push('Anda belum mengatur Struktur Soal')
    }
    if(!data.setting?.koleksi_mapel || data.setting?.koleksi_mapel?.data?.length === 0){
        isValid = false;
        message.push('Anda belum mengatur Muatan Pelajaran')
    }
    if(!data.setting?.identitas?.kelas){
        isValid = false;
        message.push('Target Paket Soal belum diload/ditentukan')
    }
    if(!data.setting?.kurikulum || data.setting?.kurikulum?.length === 0){
        isValid = false;
        message.push('Belum memilih Properti Kurikulum (TP/ATP)')
    }

    /** desain */
    if(!data.data || data.data.every(s=>s.dataSoal.length === 0)){
        isValid= false;
        message.push('Belum ada item soal yang diterapkan')
    }

    return {
        isValid,
        message
    }
}