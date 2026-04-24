import { createCrudProvider } from "~/crud/crud-template-provider";
import type MapelRombelServiceInterface from "~/domain/interfaces/mapelrombel-service-interface";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";

export const {
    CrudProvider: CrudMapelRombel,
    useCrud: useCrudMapelRombel,
} = createCrudProvider<jp_mapelSheet, MapelRombelServiceInterface>()