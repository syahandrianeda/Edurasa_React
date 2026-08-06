import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { resolveDate, resolveNumber, resolveString } from "./_resolver";

export default class DtoSuratKeluar{
    static key(){
        return [
            "idbaris",
            "nosurat",
            "id_nosurat",
            "tglsurat",
            "perihal",
            "indekssurat",
            "ditujukkankepada",
            "idfile",
            "status",
            "oleh",
            "user",
            "target_ptk",
            "target_siswa",
            "refrensi_suratmasuk",
        ]
    }
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

    static toSheet(data:Record<string, any>):SuratKeluarSheetType{
        return {
            idbaris             : resolveNumber(data.idbaris ),
            nosurat             : resolveString(data.nosurat ),
            id_nosurat          : resolveString(data.id_nosurat ),
            tglsurat            : resolveString(data.tglsurat),
            perihal             : resolveString(data.perihal ),
            indekssurat         : resolveString(data.indekssurat ),
            ditujukkankepada    : resolveString(data.ditujukkankepada ),
            idfile              : resolveString(data.idfile ),
            status              : resolveString(data.status ),
            oleh                : resolveString(data.oleh ),
            user                : resolveNumber(data.user ),
            target_siswa        : Array.isArray(data.target_siswa)?data.target_siswa.join(", "):data.target_siswa,//data.target_siswa.length===0?"":data.target_siswa.join(", "),
            target_ptk          : Array.isArray(data.target_ptk)?data.target_ptk.join(", "):data.target_ptk,//data.target_ptk.length===0?"":data.target_ptk.join(", "),
            refrensi_suratmasuk: resolveNumber(data.refrensi_suratmasuk),
        }
    }
    static arrayToSheet(data:SuratKeluarAppType[]):SuratKeluarSheetType[]{
        return data.map(this.toSheet);
    }
    static toSheetPartial(data:Partial<SuratKeluarAppType>):Partial<SuratKeluarSheetType>{
        const result: Partial<SuratKeluarSheetType> = {};

        if (data.idbaris !== undefined) {
            result.idbaris = resolveNumber(data.idbaris);
        }
        if (data.nosurat !== undefined) {
            result.nosurat = resolveString(data.nosurat);
        }
        if (data.id_nosurat !== undefined) {
            result.id_nosurat = resolveString(data.id_nosurat);
        }
        if (data.tglsurat !== undefined) {
            result.tglsurat = data.tglsurat instanceof Date
                ? data.tglsurat.toISOString()
                : resolveString(data.tglsurat);
        }
        if (data.perihal !== undefined) {
            result.perihal = resolveString(data.perihal);
        }
        if (data.indekssurat !== undefined) {
            result.indekssurat = resolveString(data.indekssurat);
        }
        if (data.ditujukkankepada !== undefined) {
            result.ditujukkankepada = resolveString(data.ditujukkankepada);
        }
        if (data.idfile !== undefined) {
            result.idfile = resolveString(data.idfile);
        }
        if (data.status !== undefined) {
            result.status = resolveString(data.status);
        }
        if (data.oleh !== undefined) {
            result.oleh = resolveString(data.oleh);
        }
        if (data.user !== undefined) {
            result.user = resolveNumber(data.user);
        }
        if (data.target_ptk !== undefined) {
            result.target_ptk = Array.isArray(data.target_ptk)
                ? data.target_ptk.map(resolveNumber).join(",")
                : resolveString(data.target_ptk);
        }
        if (data.target_siswa !== undefined) {
            result.target_siswa = Array.isArray(data.target_siswa)
                ? data.target_siswa.map(resolveNumber).join(",")
                : resolveString(data.target_siswa);
        }
        if (data.refrensi_suratmasuk !== undefined) {
            result.refrensi_suratmasuk = resolveNumber(data.refrensi_suratmasuk);
        }

        return result;
    }
    static arrayToSheetPartial(data:Partial<SuratKeluarAppType>[]):Partial<SuratKeluarSheetType>[]{
        return data.map(this.toSheetPartial)
    }
}