import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { resolveNumber, resolveString } from "./_resolver";

export default class DTOAtp{
    static fromSheet(data:Record<string, any>):AtpKurikulumType{
        return {
            idbaris:resolveNumber(data.idbaris),
            foreignkey_elemencp:resolveNumber(data.foreignkey_elemencp),
            foreignkey_tp:resolveNumber(data.foreignkey_tp),
            atp:resolveString(data.atp),
            kelas:data.kelas?.toString()?.split(',').map((m:string)=>resolveNumber(m)),
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
            kelas:data.kelas?.toString()?.split(',').map((m:string)=>resolveNumber(m)),
        }
    }
    static arrayToSheet(data:Record<string, any>[]):AtpKurikulumType[]{
        return data.map(this.toSheet);
    }
}