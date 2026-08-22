import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import { resolveNumber, resolveString } from "./_resolver";
import type { OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";

export default class DTOCp{
    static fromSheet(data:Record<string, any>):ElemenCpType{
        return {
            idbaris:resolveNumber(data.idbaris),
            kodemapel:resolveString(data.kodemapel),
            fase:resolveString(data.fase),
            elemen:resolveString(data.elemen),
            lingkup_materi:resolveString(data.lingkup_materi),
            cp_utama:resolveString(data.cp_utama),
            kode_elemen:resolveNumber(data.kode_elemen),
            cp_kunci:resolveString(data.cp_kunci),
            taksonomibloom:resolveString(data.taksonomibloom),
            status:resolveString(data.status)
        }
    }
    static arrayFromSheet(data:Record<string,any>[]):ElemenCpType[]{
        return data.map(this.fromSheet)
    }
    static toSheet(data:Record<string, any>):ElemenCpType{
        return {
            idbaris:resolveNumber(data.idbaris),
            kodemapel:resolveString(data.kodemapel),
            fase:resolveString(data.fase),
            elemen:resolveString(data.elemen),
            lingkup_materi:resolveString(data.lingkup_materi),
            cp_utama:resolveString(data.cp_utama),
            kode_elemen:resolveNumber(data.kode_elemen),
            cp_kunci:resolveString(data.cp_kunci),
            taksonomibloom:resolveString(data.taksonomibloom),
            status:resolveString(data.status)
        }
    }
    static ArrayToSheet(data:Record<string,any>[]):ElemenCpType[]{
        return data.map(this.toSheet)
    }
    
    static fromOrmToSheet(data:Record<string, any>):ElemenCpType{
        return {
            idbaris:resolveNumber(data.id_elemen_cp),
            kodemapel:resolveString(data.kodemapel),
            fase:resolveString(data.currentFase.faseName),
            elemen:resolveString(data.elemen),
            lingkup_materi:resolveString(data.lingkup_materi),
            cp_utama:resolveString(data.cp_utama),
            kode_elemen:resolveNumber(data.index),
            cp_kunci:resolveString(data.cp_kunci),
            taksonomibloom:resolveString(data.taksonomibloom),
            status:resolveString(data.status)
        }
    }
}