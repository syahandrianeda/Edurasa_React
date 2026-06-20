import { createCrudProvider } from "~/crud/crud-template-provider";
import type { ProtaServiceInterface } from "~/domain/interfaces/prota-service-interface";
import type { protaSheet } from "~/types/kurikulum/prota-orm";

export const {
    CrudProvider: CrudProtaProvider,
    useCrud: useCrudProtaProvider,
} = createCrudProvider<protaSheet, ProtaServiceInterface>()