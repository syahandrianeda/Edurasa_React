import { createCrudProvider } from "~/crud/crud-template-provider";
import type { JadwalMapelServiceInterface } from "~/domain/interfaces/sebaran-jadwal-service-interface";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";

export const {
    CrudProvider: SebaranJadwalCrudProvider,
    useCrud: useSebaranJadwalCrud,
} = createCrudProvider<jadwalMapelAccordTable, JadwalMapelServiceInterface>()