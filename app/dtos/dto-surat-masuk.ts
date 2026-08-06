import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";
import { resolveNumber, resolveString } from "./_resolver";

export default class DtoSuratMasuk{
    static fromSheetToApp(data:SuratMasukSheetType):SuratMasukAppType{
        return {
            idbaris             : resolveNumber(data.idbaris),
            tglditerima         : new Date(data.tglditerima),
            nosurat             : resolveString(data.nosurat),
            asalsurat           : resolveString(data.asalsurat),
            tglsurat            : new Date(data.tglsurat),
            perihal             : resolveString(data.perihal),
            indekssurat         : resolveString(data.indekssurat),
            ditujukkankepada    : resolveString(data.ditujukkankepada),
            idfile              : resolveString(data.idfile),
            status              : resolveString(data.status),
            oleh                : resolveString(data.oleh),
            user                : resolveNumber(data.user,undefined)
        }
    }
    static arrayToApp(data:SuratMasukSheetType[]):SuratMasukAppType[]{
        return data.map(this.fromSheetToApp);
    }

    static fromAppToSheet(data:SuratMasukAppType):SuratMasukSheetType{
        return {
                idbaris             : resolveNumber(data.idbaris),
                tglditerima         : data.tglditerima.toDateString(),
                nosurat             : resolveString(data.nosurat),
                asalsurat           : resolveString(data.asalsurat),
                tglsurat            : data.tglsurat.toDateString(),
                perihal             : resolveString(data.perihal),
                indekssurat         : resolveString(data.indekssurat),
                ditujukkankepada    : resolveString(data.ditujukkankepada),
                idfile              : resolveString(data.idfile),
                status              : resolveString(data.status),
                oleh                : resolveString(data.oleh),
                user                : resolveNumber(data.user,undefined)
        }
    }

    static arrayFromAppToSheet(data:SuratMasukAppType[]):SuratMasukSheetType[]{
        return data.map(this.fromAppToSheet);
    }
}