import type { TransaksiSerahTerimaDokumenAppType, TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import { resolveNumber, resolveString } from "./_resolver";
import type { JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import urlImgDrive from "~/lib/url-img-drive";

export default class DtoTransaksiSerahTerimaDokumen{

    static formSheetToApp(data:TransaksiSerahTerimaDokumenSheetType):TransaksiSerahTerimaDokumenAppType{
        const result:any={}
        const keyString = ["idfile", "oleh", "keterangan","status"];
        const keyArrayJson = ["items","snapshot"];
        const keyDate = ["tgl"]
        const keyEnum = ["jenis"]
        const keyNumber = ["idbaris","serah_terima_idbaris", "target_person_id"]
        for(const key in data){
            const value = data[key as keyof TransaksiSerahTerimaDokumenSheetType];
            if(keyString.includes(key)){
                result[key] = resolveString(value)
            }
            if(keyNumber.includes(key)){
                result[key] = resolveNumber(value);
            }
            if(keyDate.includes(key)){
                result[key] = new Date(value);
            }
            if(keyArrayJson.includes(key)){
                result[key] = value===""?[]:JSON.parse(value as string)
            }
            if(keyEnum.includes(key)){
                result[key] = value as keyof typeof JenisSerahTerimaEnum;
            }
        }
        return result;
    }
    static arrayFromSheetToApp(data:TransaksiSerahTerimaDokumenSheetType[]):TransaksiSerahTerimaDokumenAppType[]{
        return data.map(this.formSheetToApp);
    }
    static fromAppToSheet(data:TransaksiSerahTerimaDokumenAppType):TransaksiSerahTerimaDokumenSheetType{
        const result:any ={};
        const keyString = ["idfile", "oleh", "keterangan","status"];
        const keyArrayJson = ["items","snapshot"];
        const keyDate = ["tgl"]
        const keyEnum = ["jenis"]
        // const keyImage = ["idfile",];
        const keyNumber = ["idbaris","serah_terima_idbaris", "target_person_id"]
        for(const key in data){
            const value = data[key as keyof TransaksiSerahTerimaDokumenAppType];
            if(keyString.includes(key)){
                result[key] = resolveString(value)
            }
            if(keyNumber.includes(key)){
                result[key] = resolveNumber(value);
            }
            if(keyDate.includes(key)){
                result[key] = value.toString();//new Date(value);
            }
            if(keyArrayJson.includes(key)){
                result[key] = value===""?[]:JSON.stringify(value)
            }
            if(keyEnum.includes(key)){
                result[key] = value ;//as keyof typeof JenisSerahTerimaEnum;
            }
            // if(keyImage.includes(key)){
            //     result[key] = value ===""?"":urlImgDrive(value as string)
            // }
        }
        return result;
    }
    static arrayFromAppToSheet(data:TransaksiSerahTerimaDokumenAppType[]):TransaksiSerahTerimaDokumenSheetType[]{
        return data.map(this.fromAppToSheet);
    }
}