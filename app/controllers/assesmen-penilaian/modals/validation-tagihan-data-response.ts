import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
type warning = {
    isValid:boolean
    message?:string[]
}
export default function validationTagihanHasDataResponse(data:TagihanHasDataResponse):warning{
    let isValid:boolean = true;
    let message:string[]=[]
    if(data.nama_publikasi ===''){
        isValid= false;
        message.push('nama publikasi tidak boleh kosong')
    }

    if(data.target_rombel.length === 0){
        isValid=false;
        message.push('jenis target belum ditentukan');
    }
   
    if(data.target_type === 'siswa' && data.target_person.length === 0){
        isValid=false;
        message.push("Anda memilih tipe target siswa, tapi belum memilih siswanya")
    }
    if(data.kurikulum_tagihan.length === 0){
        isValid= false;
        message.push('Belum memilih Kompetensi yang akan diukur')
    }
    if(data.koleksi_mapelName.length === 0){
        isValid= false;
        message.push('Belum memilih mata pelajaran')
    }
    return {
        isValid, 
        message
    }
}