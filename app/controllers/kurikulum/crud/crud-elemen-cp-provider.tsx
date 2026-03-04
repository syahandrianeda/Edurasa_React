import { createCrudProvider } from "~/crud/crud-template-provider";
import type ElemenCpServiceInterface from "~/domain/interfaces/elemencp-service-interface";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";

export const {
    CrudProvider: CrudElemenCpProvider,
    useCrud: useCrudElemenCpProvider,
} = createCrudProvider<ElemenCpType, ElemenCpServiceInterface>()