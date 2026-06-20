import type { ApiResponse } from "~/configs/appscript-config"
import type { protaSheet } from "~/types/kurikulum/prota-orm"

export interface ProtaRepositoryInterface {
    update(param: Record<string, any>): Promise<ApiResponse<protaSheet>>
    create(param: Record<string, any>): Promise<ApiResponse<protaSheet>>
}