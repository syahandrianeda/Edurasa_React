import type { ApiResponse } from "~/configs/appscript-config"
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum"
import type FaseTpRepositoryInterface from "./fase-tp-repository-interface"

export default interface FaseTpServiceInterface {
    repo: FaseTpRepositoryInterface
    update(param:Record<string,any>): Promise<ApiResponse<FaseKurikulumType>>
    create(param:Record<string,any>): Promise<ApiResponse<FaseKurikulumType>>
}