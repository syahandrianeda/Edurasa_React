import { createCrudProvider } from "~/crud/crud-template-provider";
import type { SerahTerimaServiceInterface } from "~/domain/interfaces/serah-terima-service-interface";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";

export const {
    CrudProvider: CrudSerahTerimaProvider,
    useCrud: useCrudSerahTerimaProvider,
} = createCrudProvider<SerahTerimaDokumenSheetType, SerahTerimaServiceInterface>()