import type { AtpKurikulumSheetType, AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { resolveNumber, resolveString } from "./_resolver";
import type { OrmAtp } from "~/types/kurikulum/kurikulum-type";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export default class DTOAtp{
    static fromSheet(data:Record<string, any>):AtpKurikulumType{
        return {
            idbaris:resolveNumber(data.idbaris),
            foreignkey_elemencp:resolveNumber(data.foreignkey_elemencp),
            foreignkey_tp:resolveNumber(data.foreignkey_tp),
            atp:resolveString(data.atp),
            kelas:data.kelas===""?[]: data.kelas?.toString()?.split(',').map((m:string)=>resolveNumber(m)),
            status:resolveString(data.status)
            // profilpancasila:resolveString(data.profilpancasila),
            // penjelasan_profil:resolveString(data.penjelasan_profil),


        }
    }
    static arrayFromSheet(data:Record<string, any>[]):AtpKurikulumType[]{
        return data.map(this.fromSheet);
    }
    static toSheet(data:Record<string, any>):AtpKurikulumType{
        return {
            idbaris:resolveNumber(data.idbaris),
            foreignkey_elemencp:resolveNumber(data.foreignkey_elemencp),
            foreignkey_tp:resolveNumber(data.foreignkey_tp),
            atp:resolveString(data.atp),
            kelas:Array.isArray( data.kelas)? data.kelas.join(', '):data.kelas,//;//data.kelas===""?[]: data.kelas?.toString()?.split(',').map((m:string)=>resolveNumber(m)),
            status:data.status
        }
    }
    static arrayToSheet(data:Record<string, any>[]):AtpKurikulumType[]{
        return data.map(this.toSheet);
    }
    static fromOrmAtpToSheet(data:OrmAtp):AtpKurikulumSheetType{
        return {
            idbaris: resolveNumber(data.idbaris_atp),
            foreignkey_elemencp: resolveNumber(data.source_atp?.foreignkey_elemencp),
            foreignkey_tp: resolveNumber(data.source_atp?.foreignkey_tp),
            atp: resolveString(data.atp),
            kelas:data.kelas.join(', '),//Array.isArray(data.kelas)? data.kelas.join(','):'',//;//resolveString(data.kelas.join(',')),
            // profilpancasila:string,
            // penjelasan_profil?:string,
            status:resolveString(data.status)
            
        }
    }
}