import type { protaApp, protaSheet, protaSheetApp } from "~/types/kurikulum/prota-orm";
import { resolveNumber, resolveString } from "./_resolver";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";

export default class DtoProta{
    static fromSheet(data:Record<string, any>):protaSheet{
        return {
            idbaris:resolveNumber(data.idbaris),
            cp_idbaris:resolveNumber(data.cp_idbaris),
            tp_idbaris:resolveNumber(data.tp_idbaris),
            atp_idbaris:resolveNumber(data.atp_idbaris),
            rombel:resolveString(data.rombel),
            semester:resolveString(data.semester),
            index_prota:resolveNumber(data.index_prota),
            kode_mapel:resolveString(data.kode_mapel),
            alokasi_waktu:resolveNumber(data.alokasi_waktu),
            refrensi:resolveString(data.refrensi),
            status:resolveString(data.status)
        }
    }
    static arrayFromSheet(data:Record<string, any>[]):protaSheet[]{
        return data.map(this.fromSheet);
    }
    
    static toSheetApp(data:Record<string, any>):protaSheetApp{
        return {
            idbaris:resolveNumber(data.idbaris),
            cp_idbaris:resolveNumber(data.cp_idbaris),
            tp_idbaris:resolveNumber(data.tp_idbaris),
            atp_idbaris:resolveNumber(data.atp_idbaris),
            rombel:resolveString(data.rombel),
            // semester:resolveString(data.semester),
            index_prota:resolveNumber(data.index_prota),
            kode_mapel:resolveString(data.kode_mapel),
            alokasi_waktu:resolveNumber(data.alokasi_waktu),
            refrensi:resolveString(data.refrensi),
            status:resolveString(data.status),
            semester:DtoProta.fromSheet(data)?.semester===""?[]: DtoProta.fromSheet(data)?.semester?.toString()?.split(', ').map((m:string)=>resolveNumber(m)),
        }
    }
    static arrayToSheetApp(data:Record<string, any>[]):protaSheetApp[]{
        return data.map(this.toSheetApp);
    }
    
}