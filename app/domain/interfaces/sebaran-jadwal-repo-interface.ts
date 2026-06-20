import type { ApiResponse } from "~/configs/appscript-config"
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel"

export interface JadwalMapelRepoInterface {
    update(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>>
    create(param: Record<string, any>): Promise<ApiResponse<jadwalMapelAccordTable>>
}