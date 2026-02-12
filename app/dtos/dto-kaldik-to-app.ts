import type { KaldikType } from "~/types/kaldik";
import { resolveDate, resolveNumber, resolveString, toBoolean } from "./_resolver";

export class DTOKaldikSheetToApp {
    static fromSheet(dto: Record<string, any>): KaldikType {
        return {
                time_stamp: new Date(dto.time_stamp),
                keterangan: resolveString(dto.keterangan),
                start_tgl: new Date(dto.start_tgl),
                end_tgl: new Date(dto.end_tgl),
                aksi: resolveString(dto.aksi),
                idbaris:resolveNumber(dto.idbaris),
                warna: resolveString(dto.warna),
                libur_he_heb:toBoolean(dto.libur_he_heb),
                he: toBoolean(dto.he),
                heb: toBoolean(dto.heb),
                libur: toBoolean(dto.libur),
                backgroundColor:resolveString(dto.backgroundColor),
                color: resolveString(dto.color),
                hapus:resolveString(dto.hapus),
                oleh:resolveString(dto.oleh)

        } 
    }

    static fromSheetArray(dto: Record<string, any>):KaldikType[]{
        
        return dto.map(this.fromSheet);
        
    }
}