import { createCrudProvider } from "~/crud/crud-template-provider";
import type SettingJadwalServiceInterface from "~/domain/interfaces/setting-jadwal-service-interface";
import type { settingJadwalApp, settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";

export const {
    CrudProvider: SettingJadwalCrudProvider,
    useCrud: useSettingJadwalCrud,
} = createCrudProvider<settingJadwalSheet, SettingJadwalServiceInterface>()