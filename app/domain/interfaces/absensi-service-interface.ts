import type { ApiResponse } from "~/configs/appscript-config"
import type { ParamUpsert } from "~/configs/appscript-sheet"
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa"
import type { AbsensiRepositoryInterface } from "./absensi-repository-interface"

export interface AbsensiServiceInterface{
    repo: AbsensiRepositoryInterface,
    loadAbsensiAndKaldik(rombel:string):Promise<ApiResponse<Record<string, any>>[]>
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
    refreshAbsensi(rombel:string):Promise<ApiResponse<Record<string, any>>>
    create(param:Record<string,any>): Promise<ApiResponse<AbsensiSiswaSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<AbsensiSiswaSheetType>>
}