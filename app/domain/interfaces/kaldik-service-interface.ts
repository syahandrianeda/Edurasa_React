import type { ApiResponse } from "~/configs/appscript-config"
import type { KaldikSheetType, KaldikType } from "~/types/kaldik"
import type { KaldikRepositoryInterface } from "./kaldik-repository-interface"
import type { ParamUpsert } from "~/configs/appscript-sheet"

export interface KaldikServiceInterface{
    repo: KaldikRepositoryInterface
    loadAllKaldik():Promise<ApiResponse<KaldikType>>
    create(param:Record<string,any>): Promise<ApiResponse<KaldikType>>
    update(param:Partial<ParamUpsert<KaldikSheetType>>): Promise<ApiResponse<KaldikType>>
}