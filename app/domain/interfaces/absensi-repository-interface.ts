import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { ParamUpsert } from "~/configs/appscript-sheet"
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa"

export interface AbsensiRepositoryInterface{
    loadAbsensiAndKaldik():Promise<ApiResponse<Record<string, any>>[]>
    refreshAbsensi():Promise<ApiResponse<Record<string, any>>>
    uploadFileRepo(param:ParamFile):Promise<Record<string, any>>
    create(param:Record<string,any>): Promise<ApiResponse<AbsensiSiswaSheetType>>
    update(param:Partial<ParamUpsert<AbsensiSiswaType>>): Promise<ApiResponse<AbsensiSiswaSheetType>>
}