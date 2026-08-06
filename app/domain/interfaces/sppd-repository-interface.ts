import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type"

export interface SppdRepositoryInterface{
    uploadFile(param:ParamFile):Promise<Record<string, any>>
    findById(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
    create(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
}