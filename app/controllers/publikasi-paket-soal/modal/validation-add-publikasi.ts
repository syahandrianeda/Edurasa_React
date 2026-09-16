import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
type warning = {
    isValid:boolean
    message?:string[]
}
export default function validationAddPublikasi(data:PublikasiPaketAppType):warning{
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
    if(data.id_file_setting===''){
        isValid=false;
        message.push('file Setting belum terdeteksi');
    }
    return {
        isValid, 
        message
    }
}