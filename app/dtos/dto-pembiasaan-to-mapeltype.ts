import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import { resolveNumber, resolveString } from "./_resolver";

export default class DtoPembiasaanToMapelType{
    static toMapelType(data:any):jp_mapelApp{
        return {
            idbaris: resolveNumber(data.index_in_rombel),//resolveNumber(data.idbaris),
            kode: resolveString(data.kode),
            idmapel: resolveNumber(data.idmapel),       
            nama_mapel: resolveString(data.nama_mapel),
            jp_perminggu: resolveNumber(data.jp_perminggu),
            following_students: resolveNumber(data.following_students),
            required_penganut: resolveString(data.required_penganut),
            nama_mapel_ijazah: resolveString(data.nama_mapel_ijazah),
            status: resolveString(data.status),
            nama_rombel: resolveString(data.nama_rombel),
            index_in_rombel: resolveNumber(data.idbaris),//resolveNumber(data.index_in_rombel),
            source: data,
        }
    }
    static arrayToMapelType(data:any[]):jp_mapelApp[]{
        return data.map(this.toMapelType);
    }   
}