import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { resolveDate, resolveEnum, resolveNumber, resolveString } from "./_resolver";
import { JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import type { InfoPersonalSiswa, SiswaType } from "~/types/siswa";
// import { getEnumKey, getEnumKeyUndefined } from "~/lib/get-enum-key";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import type { InfoPersonalPtk } from "~/types/akun-sheet";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";
import { getEnumKey } from "~/lib/get-enum-key";

export default class DtoSerahTerimaDokumen{
    static fromSheetToApp (data:Record<string, any>):SerahTerimaDokumenAppType {
        return {
            idbaris         : resolveNumber(data.idbaris),
            nama_kegiatan   : resolveString(data.nama_kegiatan),
            jenis           : data.jenis ,//&& resolveEnum(data.jenis, JenisSerahTerimaEnum,JenisSerahTerimaEnum.SERAH),
            start_date      : new Date(data.start_date),
            end_date        : data.end_date && resolveDate(data.end_date),
            keterangan      : resolveString(data.keterangan),
            akses_user      : data.akses_user===""?[]:JSON.parse(data.akses_user),
            target_person   : data.target_person===""?[]:JSON.parse(data.target_person),
            type_target     :  data.type_target,// getEnumKey(PersonalTypeEnum,data.type_target),
            item_barang     : data.item_barang === ""? []: JSON.parse(data.item_barang),
            additional_info : data.additional_info === ''?[] :JSON.parse(data.additional_info),//DtoSerahTerimaDokumen.parsePersonalSiswa(data.additional_info) : DtoSerahTerimaDokumen.parsePersonalPtk(data.addtional_info)
            status           : resolveString(data.status)
        }
    }

    static arrayFromSheetToApp (data:Record<string, any>[]):SerahTerimaDokumenAppType[] {
        return data.map(this.fromSheetToApp)
    }

    static normalizePersonalSiswaInfo(data:Record<string, any>):InfoPersonalSiswa{
        const result:any={}
        for(const key in data){
            const value = data[key as keyof SiswaType];
            if(value instanceof Date){
                result[key] = resolveDate(value)
            }else if(value instanceof Number){
                result[key] = resolveNumber(value);
            }else if(value instanceof String){
                result[key] = resolveString(value)
            }else{
                if(key === 'tempat_tanggal_lahir'){
                    
                }else if(key === 'orang_tua'){

                }else{
                    result[key] = value;
                }
            }
        }

        return result;
    }

    static normalizePersonalPtkInfo(data:Record<string, any>):InfoPersonalPtk{
        const result:any={}
        for(const key in data){
            const value = data[key as keyof InfoPersonalPtk];
            if(value instanceof Date){
                result[key] = resolveDate(value);
            }else if(value instanceof Number){
                result[key] = resolveNumber(value);
            }else if(value instanceof String){
                result[key] = resolveString(value)
            }else{
                /**
                 *  gol_ruang?:string,
    pangkat?:string,
    status_ptk?:string
                 */
                if(key === 'gol_ruang'){
                    result[key] = JSON.parse(value);
                }else{
                    result[key] = value;
                }
            }
        }

        return result;
    }

    static parsePersonalSiswa(raw: any): InfoPersonalSiswa[] {
        if (!raw) return []

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
        return raw.map(this.normalizePersonalSiswaInfo)
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
            return parsed.map(this.normalizePersonalSiswaInfo)
            }
        } catch {
            // 3️⃣ CSV / pipe string fallback
            return []
        }
        }

        return []
    }

    static parsePersonalPtk(raw: any): InfoPersonalPtk[] {
        if (!raw) return [];

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
            return raw.map(this.normalizePersonalPtkInfo);
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    return parsed.map(this.normalizePersonalPtkInfo);
                }
            } catch {
                // 3️⃣ CSV / pipe string fallback
                return [];
            }
        }
        return [];
    }
    
    static createInfoPersonalSiswa(source:InfoPersonalSiswa, key:(keyof InfoPersonalSiswa)):InfoPersonalSiswa{
        const result:any={}
        const value = source[key as keyof InfoPersonalSiswa]
            if(key === 'tempat_tanggal_lahir'){
                result[key] = {
                        tempat: source?.pd_tl,
                        tanggal_lahir: source.pd_tanggallahir,
                        ttl: `${source.pd_tl}, ${source.pd_tanggallahir?.toLocaleDateString('id-ID', {dateStyle:'long'})}`
                    };
            }else if(key === 'orang_tua'){
                result[key] = {
                        nama_ayah: source.pd_namaayah,
                        nama_ibu: source.pd_namaibu
                    };
            }else if(key === 'no_ijazah'){
                result[key] = source.dapo_noseriijazah;

            }else if(key === 'no_transkip'){
                result[key] = 'transkip_belum dipanggil';

            }else{
                result[key] = value;
            }

        return result;//structuredClone(result);
    }

    static createInfoPersonalPtk(source:InfoPersonalPtk, key:(keyof InfoPersonalPtk)):InfoPersonalPtk{
        const result:any={}
        const value = source[key as keyof InfoPersonalSiswa];
        

        return result;//structuredClone(result);
    }
    
    static fromAppToSheet(data:SerahTerimaDokumenAppType):SerahTerimaDokumenSheetType{
        const resp:any={};
        for(const key in data){
            const value = data[key as keyof SerahTerimaDokumenAppType];
            if(value instanceof Date){
                resp[key] = new Date(value);
            }else if(value instanceof Number){
                resp[key] = Number(value)
            }else if(Array.isArray(value)){
                resp[key]= JSON.stringify(value);
            }else{
                resp[key] = value
            }
        }
        return resp
    }
    static arrayFromAppToSeet(data:SerahTerimaDokumenAppType[]):SerahTerimaDokumenSheetType[]{
        return data.map(this.fromAppToSheet);
    }

}