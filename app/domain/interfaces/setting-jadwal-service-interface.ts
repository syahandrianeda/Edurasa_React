import type { settingJadwalApp, settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal"
import type { ApiResponse } from "~/configs/appscript-config"
import type SettingJadwalRepositoryInterface from "./setting-jadwal-repository-interface"

export default interface SettingJadwalServiceInterface {
    // repo: SettingJadwalRepositoryInterface
    update(param:Record<string,any>): Promise<ApiResponse<settingJadwalSheet>>
    create(param:Record<string,any>): Promise<ApiResponse<settingJadwalSheet>>
}