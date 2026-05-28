
import type { jadwalMapelApp,  jadwalMapelSheet } from "~/types/setting_jadwal/jadwal_mapel";

export default class DtoJadwalMapelToApp{
    static fromSheet(data:jadwalMapelSheet):jadwalMapelApp{
        return {
            idbaris: data.idbaris,
            idmapel: data.idmapel,
            index_hari: data.index_hari,    
            jp: data.jp,
            namarombel: data.namarombel,
            start_at: new Date(data.start_at).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(".", ":") ?? '',
            end_at: new Date(data.end_at).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(".", ":") ?? '',
        }
    }   
    static arrayFromSheet(data:jadwalMapelSheet[]):jadwalMapelApp[]{
        return data.map(this.fromSheet);
    }   
}