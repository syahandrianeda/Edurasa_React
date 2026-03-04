import type { ApiResponse } from "~/configs/appscript-config"
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp"
import type ElemenCpRepositoryInterface from "./elemencp-repository-interface"

export default interface ElemenCpServiceInterface {
    repo:ElemenCpRepositoryInterface
    loadAllKurmer():Promise<ApiResponse<Record<string, any>>[]>;
    update(param:Record<string,any>): Promise<ApiResponse<ElemenCpType>>
    create(param:Record<string,any>): Promise<ApiResponse<ElemenCpType>>
}