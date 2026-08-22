import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

type warning = {
    isValid:boolean
    message?:string
}
export default function ValidationItemSoal(data:BankSoalAppType):warning{
    const result:warning = {isValid:true};
    
    
    if(data.indikator_soal === ''){
        result.isValid=false;
        result.message='Indikator Soal harus diisi'
        
    }
    if(data.materi_pokok === ''){
        result.isValid=false;
        result.message='Materi Pokok wajib diisi'
        
    }
    if(data.pembahasan_penskoran === ''){
        result.isValid=false;
        result.message='Pembahasan harus diisi'
    }
    if(['pg', 'pg_kompleks'].includes(data.bentuk_soal) && data?.json_alat_jawab?.OpsiPilihanJawaban?.some(s=>s.content === '')){
        
        result.isValid=false;
        result.message='Opsi ada yang belum diisi'
    }
    if(data.pertanyaan === ''){
        result.isValid=false;
        result.message='Pertanyaan belum diisi'
    }
    return result;
}