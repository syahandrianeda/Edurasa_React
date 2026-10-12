import { createCrudProvider } from "~/crud/crud-template-provider";
import type { PublikasiPaketServiceInterface } from "~/domain/interfaces/publikasi-paket-service-interface";
import type { PublikasiPaketSheetType } from "~/types/publikasi-paket-soal/publikasi-paket-sheet-type";


export const {
    CrudProvider: CrudPublikasiPaketSoalProvider,
    useCrud: useCrudPublikasiPaketSoal,
} = createCrudProvider<PublikasiPaketSheetType, PublikasiPaketServiceInterface>()