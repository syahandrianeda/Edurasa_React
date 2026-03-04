import type { ApiResponse } from "~/configs/appscript-config"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum"

export default interface FaseTpRepositoryInterface {
        update(param:Record<string,any>): Promise<ApiResponse<FaseKurikulumType>>
        create(param:Record<string,any>): Promise<ApiResponse<FaseKurikulumType>>
}