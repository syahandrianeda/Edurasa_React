import { createCrudProvider } from "~/crud/crud-template-provider";
import type ElemenCpServiceInterface from "~/domain/interfaces/elemencp-service-interface";
import type { TabunganServiceInterface } from "~/domain/interfaces/tabungan-service-interface";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export const {
    CrudProvider: CrudTabunganProvider,
    useCrud: useCrudTabunganProvider,
} = createCrudProvider<TabunganSheetType, TabunganServiceInterface>()