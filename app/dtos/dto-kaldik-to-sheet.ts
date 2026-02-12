import type { KaldikSheetType, KaldikType } from "~/types/kaldik";
import { resolveDate, resolveNumber, resolveString, toBoolean } from "./_resolver";

export class DTOKaldikSheetToSheet {
    static fromApp(dto: KaldikType): KaldikSheetType {
        return {
                time_stamp: new Date(),
                keterangan: resolveString(dto.keterangan),
                start_tgl: dto.start_tgl,
                end_tgl: dto.end_tgl,
                aksi: resolveString(dto.aksi),
                idbaris:resolveNumber(dto.idbaris),
                warna: resolveString(dto.warna),
                libur_he_heb:dto.libur_he_heb?1:0,
                he: dto.he?1:0,
                heb: dto.heb?1:0,
                libur: dto.libur?1:0,
                backgroundColor:resolveString(dto.backgroundColor),
                color: resolveString(dto.color),
                hapus:resolveString(dto.hapus),
                oleh:resolveString(dto.oleh)

        } 
    }

    static fromAppArray(dto: Record<string, any>):KaldikType[]{
        
        return dto.map(this.fromApp);
        
    }
}