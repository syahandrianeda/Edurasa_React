import { createCrudProvider } from "~/crud/crud-template-provider";
import type AtpServiceInterface from "~/domain/interfaces/atp-service-interface";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";

export const {
    CrudProvider: CrudAtpProvider,
    useCrud: useCrudAtpProvider,
} = createCrudProvider<AtpKurikulumType, AtpServiceInterface>()