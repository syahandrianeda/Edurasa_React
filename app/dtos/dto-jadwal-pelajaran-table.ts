
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
            status: resolveString(data.status),
            type_row: resolveString(data.type_row),

        }
    }
    static arrayFromSheet(data:any[]):jadwalMapelAccordTable[]{
        return data.map(this.fromSheet);
    }   

    // static toTableApp(data:any,mapel:jp_mapelApp[]):jadwalMapelAccordTableApp{
    //     const dataTable = DtoJadwalPelajaranTable.fromSheet(data);
    //     return {
    //         ...dataTable,
    //         sn: DtoJadwalPelajaranTable.resolveMapel(dataTable.sn, mapel),
    //         sl: DtoJadwalPelajaranTable.resolveMapel(dataTable.sl, mapel),
    //         rb: DtoJadwalPelajaranTable.resolveMapel(dataTable.rb, mapel),
    //         km: DtoJadwalPelajaranTable.resolveMapel(dataTable.km, mapel),
    //         jm: DtoJadwalPelajaranTable.resolveMapel(dataTable.jm, mapel),
    //         sb: DtoJadwalPelajaranTable.resolveMapel(dataTable.sb, mapel), 
    //     }
    // }
    // static resolveMapel(idmapel?:number, mapel:jp_mapelApp[]):jp_mapelApp{
    //     if(idmapel && idmapel>1000){

    //     }
    //     const result = mapel.find(item=>item.idbaris === idmapel);
    //     if (!result) {
    //         // throw new Error(`Mapel not found for ID: ${idmapel}`);
    //         return undefined as any;
    //         // return {
    //         //     idbaris:0,
    //         //     kode:'',
    //         //     idmapel:0,
    //         //     nama_mapel:'',
    //         //     jp_perminggu:0,
    //         //     following_students:0,
    //         //     required_penganut:'',
    //         //     nama_mapel_ijazah:'',
    //         //     status:'',
    //         //     nama_rombel:'',
    //         //     index_in_rombel:0,
    //         //     source:undefined as any,
    //         // }
    //     }
    //     return result;
    // }
    // static toTableAppArray(data:any[], mapel:jp_mapelApp[]):jadwalMapelAccordTableApp[]{
    //     return data.map(item=>this.toTableApp(item, mapel));
    // }
    static resolveMapelAndMapelNonKbm(idmapel?:number, mapel?:jp_mapelApp[], mapelNonKbm?:jp_mapelApp[]):jp_mapelApp{
        if(idmapel && idmapel>1000){
            const result = mapelNonKbm?.find(item=>item.idbaris === idmapel);
            if (!result) {  
                return undefined as any;
            }
            return result;
        }
        const result = idmapel && mapel?.find(item=>item.idbaris === idmapel);
        if (!result) {
            // throw new Error(`Mapel not found for ID: ${idmapel}`);
            return undefined as any;
            
        }
        return result;
    }
    static toTableAppArrayWithNonKbm(data:any[], mapel:jp_mapelApp[], mapelNonKbm:jp_mapelApp[]):jp_mapelApp[]{
        return data.map(item=>this.resolveMapelAndMapelNonKbm(item, mapel, mapelNonKbm));
    }
    static toTableAppMapelAndNonKbm(data:any[], mapel:jp_mapelApp[], mapelNonKbm:jp_mapelApp[]):jadwalMapelAccordTableApp[]{
        return data.map(item=>{
            const dataTable = DtoJadwalPelajaranTable.fromSheet(item);
            return {
                ...dataTable,
                sn: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.sn, mapel, mapelNonKbm),
                sl: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.sl, mapel, mapelNonKbm),
                rb: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.rb, mapel, mapelNonKbm),
                km: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.km, mapel, mapelNonKbm),
                jm: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.jm, mapel, mapelNonKbm),
                sb: DtoJadwalPelajaranTable.resolveMapelAndMapelNonKbm(dataTable.sb, mapel, mapelNonKbm),
            }
        });
    }
    static toSheet(data:jadwalMapelAccordTableApp):jadwalMapelAccordTable{
        return {
            ...data,
            sn:  data?.sn?.idbaris||0,
            sl:  data?.sl?.idbaris||0,
            rb:  data?.rb?.idbaris||0,
            km:  data?.km?.idbaris||0,
            jm:  data?.jm?.idbaris||0,
            sb:  data?.sb?.idbaris||0,
        }
    }   
    static sebararanMapelToSheet(data:jadwalMapelAccordTableApp[]):jadwalMapelAccordTable[]{
        return data.map(this.toSheet);
    }  
}