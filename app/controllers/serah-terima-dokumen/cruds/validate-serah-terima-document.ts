import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";

type WarningValidationSerahTerimaDokumen={
    isValid:boolean,
    message?:string
}
export default function isValidInputSerahTerimaDokumen(data:SerahTerimaDokumenAppType):WarningValidationSerahTerimaDokumen{
    const result:WarningValidationSerahTerimaDokumen={isValid:true}

    if(data.nama_kegiatan ===""){
        result.isValid = false;
        result.message="Nama Kegiatan harus diisi";
    }

    if(data.target_person.length ===0) {
        result.isValid = false;
        result.message=`Data ${data.type_target} harus dipilih`
    }
    if(!data.jenis){
        result.isValid = false;
        result.message = 'Harus memilih jenis tipe penyerahan/penerimaan'
    }
    // if(data.target_person.length ===0) {
    //     result.isValid = false;
    //     result.message=`Data ${data.type_target} harus dipilih`
    // }

    if(data.item_barang.length === 0){
        result.isValid = false;
        result.message = 'Dokumen yang diserah-terimakan harus diisi'
    }
    return result;
}