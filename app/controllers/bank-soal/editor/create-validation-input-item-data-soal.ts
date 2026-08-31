import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

type warning = {
    isValid:boolean
    message?:string
}
export default function ValidationItemSoal(data:BankSoalAppType):warning{
    const result:warning = {isValid:true};
    
    if(!data.snapshot_kurikulum){
        result.isValid = false;
        result.message = 'Belum memilih Properti kurikulum'
    }else if(data.kd_id === 0){
        result.isValid = false;
        result.message = 'Belum menentukan Tujuan Pembelajaran (ATP)'
    }else if(data.jenjang_khusus === 0){
        result.isValid = false;
        result.message ='Belum menenetukan kelas'
    }else if(data.kode_mapel === '' || data.mapel_name === ''){
        result.isValid = false;
        result.message='Belum Memilih Mata Pelajaran'
    }else if(data.lk === ''){
        result.isValid = false;
        result.message='Level Kognitif belum ditentukan'
    }else if(data.indikator_soal === ''){
        result.isValid=false;
        result.message='Indikator Soal harus diisi'
        
    }else if(data.materi_pokok === ''){
        result.isValid=false;
        result.message='Materi Pokok wajib diisi'
        
    }else if(data.pembahasan_penskoran === ''){
        result.isValid=false;
        result.message='Pembahasan harus diisi'
    }else if(['pg', 'pg_kompleks'].includes(data.bentuk_soal) && data?.json_alat_jawab?.OpsiPilihanJawaban?.length === 0 && data?.json_alat_jawab?.OpsiPilihanJawaban?.some(s=>s.content === '')){
        
        result.isValid=false;
        result.message='Opsi jawaban ada yang belum diisi'
    }else if(data.pertanyaan === ''){
        result.isValid=false;
        result.message='Pertanyaan belum diisi'
    }else{
        result.message = 'ok'
    }
    return result;
}