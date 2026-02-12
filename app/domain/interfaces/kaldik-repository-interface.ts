import type { ApiResponse } from "~/configs/appscript-config"
import type { KaldikType } from "~/types/kaldik"

export interface KaldikRepositoryInterface{
    loadAllKaldik():Promise<ApiResponse<KaldikType>>
    create(param:Record<string,any>): Promise<ApiResponse<KaldikType>>
    update(param:Record<string,any>): Promise<ApiResponse<KaldikType>>
}