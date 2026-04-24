import type { ApiResponse } from "~/configs/appscript-config"
import type { ParamUpsert } from "~/configs/appscript-sheet"
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel"

export default interface MapelRombelRepositoryInterface {
        loadAllNeed():Promise<ApiResponse<Record<string, any>>[]>
        update(param:Partial<ParamUpsert<jp_mapelSheet>>):Promise<ApiResponse<jp_mapelSheet>|null>
        create(param:Partial<ParamUpsert<jp_mapelSheet>>):Promise<ApiResponse<jp_mapelSheet>|null>
}