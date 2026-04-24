import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import { resolveNumber, resolveString } from "./_resolver";

export default class DTOMapelRombel{
    static fromSheet(data:Record<string, any>):jp_mapelSheet{
        return {
            // idbaris:resolveNumber(data.id),
            // idmapel:resolveNumber(data.idmapel),
            // namarombel:resolveString(data.namarombel),
            // jenjang:resolveNumber(data.jenjang),
            // jp:resolveNumber(data.jp),
            // index_mapel:resolveNumber(data.index_mapel),
            // status:resolveString(data.status)
                idbaris: resolveNumber(data.idbaris ),
                idmapel: resolveNumber(data.idmapel),
                kode: resolveString(data.kode ),
                nama_mapel: resolveString(data.nama_mapel ),
                jp_perminggu: resolveNumber(data.jp_perminggu ),
                following_students: resolveNumber(data.following_students),
                required_penganut: resolveString(data.required_penganut),
                nama_mapel_ijazah: resolveString(data.nama_mapel_ijazah),
                status: resolveString(data.status),
                nama_rombel: resolveString(data.nama_rombel),
                index_in_rombel:resolveNumber(data.index_in_rombel)

        }
    }
    static arrayFromSheet(data:Record<string, any>[]):jp_mapelSheet[]{
        return data.map(this.fromSheet);
    }
}