import { createCrudProvider } from "~/crud/crud-template-provider";
import type FaseTpServiceInterface from "~/domain/interfaces/fase-tp-service-interface";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";

export const {
    CrudProvider: CrudTpFaseProvider,
    useCrud: useCrudTpFaseProvider,
} = createCrudProvider<FaseKurikulumType, FaseTpServiceInterface>()