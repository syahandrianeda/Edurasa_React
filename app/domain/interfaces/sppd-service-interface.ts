import type { ApiResponse } from "~/configs/appscript-config"
import type { SppdRepositoryInterface } from "./sppd-repository-interface"
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type"

export interface SppdServiceInterface{
    
            repo: SppdRepositoryInterface,
            
            uploadFile(param:File,options?:Record<string,any>): Promise<any>
                findById(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
                create(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
                update(param:Record<string,any>): Promise<ApiResponse<SppdSheetType>>
}