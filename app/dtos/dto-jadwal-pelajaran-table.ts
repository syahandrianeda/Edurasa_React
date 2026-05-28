
import type { jadwalMapelAccordTable, jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel";
import { resolveNumber, resolveString } from "./_resolver";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

export default class DtoJadwalPelajaranTable{
    static fromSheet(data:any):jadwalMapelAccordTable{
        return {
            idbaris: resolveNumber(data.idbaris),
            jam_ke: resolveNumber(data.jam_ke),
            waktu: resolveString(data.waktu),
            namarombel: resolveString(data.namarombel),
            sn: resolveNumber(data.sn),
            sl: resolveNumber(data.sl),
            rb: resolveNumber(data.rb),
            km: resolveNumber(data.km),
            jm: resolveNumber(data.jm),
            sb: resolveNumber(data.sb), 

        }
    }
    static arrayFromSheet(data:any[]):jadwalMapelAccordTable[]{
        return data.map(this.fromSheet);
    }   

    static toTableApp(data:any,mapel:jp_mapelApp[]):jadwalMapelAccordTableApp{
        const dataTable = DtoJadwalPelajaranTable.fromSheet(data);
        return {
            ...dataTable,
            sn: DtoJadwalPelajaranTable.resolveMapel(dataTable.sn, mapel),
            sl: DtoJadwalPelajaranTable.resolveMapel(dataTable.sl, mapel),
            rb: DtoJadwalPelajaranTable.resolveMapel(dataTable.rb, mapel),
            km: DtoJadwalPelajaranTable.resolveMapel(dataTable.km, mapel),
            jm: DtoJadwalPelajaranTable.resolveMapel(dataTable.jm, mapel),
            sb: DtoJadwalPelajaranTable.resolveMapel(dataTable.sb, mapel), 
        }
    }
    private static resolveMapel(idmapel:number, mapel:jp_mapelApp[]):jp_mapelApp{
        const result = mapel.find(item=>item.idbaris === idmapel);
        if (!result) {
            // throw new Error(`Mapel not found for ID: ${idmapel}`);
            return undefined as any;
            // return {
            //     idbaris:0,
            //     kode:'',
            //     idmapel:0,
            //     nama_mapel:'',
            //     jp_perminggu:0,
            //     following_students:0,
            //     required_penganut:'',
            //     nama_mapel_ijazah:'',
            //     status:'',
            //     nama_rombel:'',
            //     index_in_rombel:0,
            //     source:undefined as any,
            // }
        }
        return result;
    }
    static toTableAppArray(data:any[], mapel:jp_mapelApp[]):jadwalMapelAccordTableApp[]{
        return data.map(item=>this.toTableApp(item, mapel));
    }
}