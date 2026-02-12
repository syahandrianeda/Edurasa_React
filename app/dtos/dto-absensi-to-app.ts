import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa";
import { resolveNumber, resolveString } from "./_resolver";
import type { dataAbsensiTypeSlice } from "~/context-reduct/global-state/absensi-slice";

export default class DTOAbsensiToApp{
    static fromSheet(dto:AbsensiSiswaSheetType):AbsensiSiswaType{
        return {
            Time_Stamp: new Date(dto.Time_Stamp),
            id: resolveString(dto.id),
            name: resolveString(dto.name),
            kelas: resolveString(dto.kelas),
            kehadiran: resolveString(dto.kehadiran),
            fileContent: resolveString(dto.fileContent),
            resume: resolveString(dto.resume),
            action: resolveString(dto.action),
            idbaris: resolveNumber(dto.idbaris),
            tokensiswa: resolveNumber(dto.tokensiswa)
        }
    }
    static fromSheetArray(dto:AbsensiSiswaSheetType[]):AbsensiSiswaType[]{
        return dto.map(this.fromSheet)
    }
    static fromSelector(dto:Record<string, any>):dataAbsensiTypeSlice{
        return {
            data: dto.data.map(DTOAbsensiToApp.fromSheet),
            nama_rombel: resolveString(dto.nama_rombel)
        }
    }
    static fromSelectorArray(dto:Record<string,any>):dataAbsensiTypeSlice[]{
        return dto.map(this.fromSelector)
    }
}