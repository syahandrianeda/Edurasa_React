import type { ApiResponse } from "~/configs/appscript-config"
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum"
import type AtpRepositoryInterface from "./atp-repository-interface"

export default interface AtpServiceInterface {
    repo:AtpRepositoryInterface
    update(param:Record<string,any>): Promise<ApiResponse<AtpKurikulumType>>
    create(param:Record<string,any>): Promise<ApiResponse<AtpKurikulumType>>
}