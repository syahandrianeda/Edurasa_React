import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import { resolveNumber, resolveString } from "./_resolver";

export default class DTOCp{
    static fromSheet(data:Record<string, any>):ElemenCpType{
        return {
            idbaris:resolveNumber(data.idbaris),
            kodemapel:resolveString(data.kodemapel),
            fase:resolveString(data.fase),
            elemen:resolveString(data.elemen),
            cp_utama:resolveString(data.cp_utama),
            kode_elemen:resolveNumber(data.kode_elemen),
            cp_kunci:resolveString(data.cp_kunci),
            taksonomibloom:resolveString(data.taksonomibloom),
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
            cp_utama:resolveString(data.cp_utama),
            kode_elemen:resolveNumber(data.kode_elemen),
            cp_kunci:resolveString(data.cp_kunci),
            taksonomibloom:resolveString(data.taksonomibloom),
        }
    }
    static ArrayToSheet(data:Record<string,any>[]):ElemenCpType[]{
        return data.map(this.toSheet)
    }
}