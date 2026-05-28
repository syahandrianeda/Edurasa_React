import type { ApiResponse } from "~/configs/appscript-config"
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal"

export default interface SettingJadwalRepositoryInterface {
    // loadAll():Promise<settingJadwalSheet[]>
    update(param:Record<string,any>): Promise<ApiResponse<settingJadwalSheet>>
    create(param:Record<string,any>): Promise<ApiResponse<settingJadwalSheet>>
}