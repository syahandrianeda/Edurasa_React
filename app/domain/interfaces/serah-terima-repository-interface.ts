import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type"

export interface SerahTerimaRepositoryInterface{
    uploadFileRepo(param:ParamFile):Promise<Record<string, any>>
    create(param:Record<string,any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>>
    
}