import type { ApiResponse, ParamFile } from "~/configs/appscript-config"
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type"
import type { SerahTerimaRepositoryInterface } from "./serah-terima-repository-interface"

export interface SerahTerimaServiceInterface{
    repo:SerahTerimaRepositoryInterface
    create(param:Record<string,any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>>
    update(param:Record<string,any>): Promise<ApiResponse<SerahTerimaDokumenSheetType>>
    
}