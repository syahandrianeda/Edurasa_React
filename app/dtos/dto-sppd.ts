import type { SppdAppType } from "~/types/surat/sppd-app-type";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import { resolveDate, resolveNumber, resolveString } from "./_resolver";

export default class DtoSppd{
    static toApp(data:SppdSheetType):SppdAppType{
        return {
                idbaris                 : resolveNumber(data.idbaris),
                refrensi_suratkeluar    : resolveNumber(data.refrensi_suratkeluar),
                ptk_diperintah          : resolveNumber(data.ptk_diperintah),
                ptk_golongan            : resolveString(data.ptk_golongan),
                ptk_jabatan             : resolveString(data.ptk_jabatan),
                ptk_maksudsppd          : resolveString(data.ptk_maksudsppd),
                ptk_tempatsppd          : resolveString(data.ptk_tempatsppd),
                ptk_starttgl            : new Date(data.ptk_starttgl),
                ptk_durasisppd          : resolveNumber(data.ptk_durasisppd),
                ptk_nosppd              : resolveString(data.ptk_nosppd),
                resume                  : resolveString(data.resume),
                arsip_nosppd            : resolveString(data.arsip_nosppd),
                versiupload             : resolveString(data.versiupload),
                hapus                   : resolveString(data.hapus),

        }
    }
    static arrayToApp(data:SppdSheetType[]):SppdAppType[]{
        return data.map(this.toApp)
    }

    static fromSheet(data:Record<string, any>):SppdAppType{
        return this.toApp(data as SppdSheetType);
    }

    static arrayFromSheet(data:Record<string, any>[]):SppdAppType[]{
        return data.map(this.fromSheet)
    }

    static toSheet(data:Record<string, any>):SppdSheetType{
        return {
            
                idbaris                 : resolveNumber(data.idbaris),
                refrensi_suratkeluar    : resolveNumber(data.refrensi_suratkeluar),
                ptk_diperintah          : resolveNumber(data.ptk_diperintah),
                ptk_golongan            : resolveString(data.ptk_golongan),
                ptk_jabatan             : resolveString(data.ptk_jabatan),
                ptk_maksudsppd          : resolveString(data.ptk_maksudsppd),
                ptk_tempatsppd          : resolveString(data.ptk_tempatsppd),
                ptk_starttgl            : new Date(data.ptk_starttgl).toString(),
                ptk_durasisppd          : resolveNumber(data.ptk_durasisppd,1),
                ptk_nosppd              : resolveString(data.ptk_nosppd),
                resume                  : resolveString(data.resume),
                arsip_nosppd            : resolveString(data.arsip_nosppd),
                versiupload             : resolveString(data.versiupload),
                hapus                   : resolveString(data.hapus),
        }
    }

    static arrayToSheet(data:Record<string, any>[]):SppdSheetType[]{
        return data.map(this.toSheet)
    }
}