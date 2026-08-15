import { createCrudProvider } from "~/crud/crud-template-provider";
import type { TendikPangkatGolonganServiceInterface } from "~/domain/interfaces/tendik-pangkat-gol-service-interface";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";

export const {
    CrudProvider: CrudPangkatGolonganProvider,
    useCrud: useCrudPangkatGolongan,
} = createCrudProvider<PangkatGolonganSheetType, TendikPangkatGolonganServiceInterface>();