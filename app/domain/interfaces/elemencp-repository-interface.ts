import type { ApiResponse } from "~/configs/appscript-config"
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp"

export default interface ElemenCpRepositoryInterface {
        loadAllNeed():Promise<ApiResponse<Record<string, any>>[]>
        update(param:Record<string,any>): Promise<ApiResponse<ElemenCpType>>
        create(param:Record<string,any>): Promise<ApiResponse<ElemenCpType>>
}