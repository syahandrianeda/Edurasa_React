import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { resolveDate, resolveNumber, resolveString } from "./_resolver";

export default class DtoSuratKeluar{
    static toApp(data:SuratKeluarSheetType):SuratKeluarAppType{
        return{
            idbaris            : resolveNumber(data.idbaris),
            nosurat            : resolveString(data.nosurat),
            id_nosurat         : resolveString(data.id_nosurat),
            tglsurat           : new Date(data.tglsurat),
            perihal            : resolveString(data.perihal),
            indekssurat        : resolveString(data.indekssurat),
            ditujukkankepada   : resolveString(data.ditujukkankepada),
            idfile             : resolveString(data.idfile),
            status             : resolveString(data.status),
            oleh               : resolveString(data.oleh),
            user               : resolveNumber(data.user),
            target_ptk         : data.target_ptk === ""? [] : data.target_ptk.toString().trim().split(',').map(m=>resolveNumber(m)),
            target_siswa       : data.target_siswa === ""?[]: data.target_siswa.toString().trim().split(',').map(m=>resolveNumber(m)),
            refrensi_suratmasuk:resolveNumber(data.refrensi_suratmasuk),
        }
    }

    static arrayToApp(data:SuratKeluarSheetType[]):SuratKeluarAppType[]{
        return data.map(this.toApp)
    }
}