import { createCrudProvider } from "~/crud/crud-template-provider";
import type { PaketSoalServiceInterface } from "~/domain/interfaces/paket-soal-service-interface";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export const {
    CrudProvider: CrudPaketSoalProvider,
    useCrud: useCrudPaketSoalProvider,
} = createCrudProvider<PaketSoalSheetType, PaketSoalServiceInterface>()