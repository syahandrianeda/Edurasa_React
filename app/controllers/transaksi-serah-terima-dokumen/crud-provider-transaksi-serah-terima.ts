import { createCrudProvider } from "~/crud/crud-template-provider";
import type { TransaksiSerahTerimaServiceInterface } from "~/domain/interfaces/transaksi-serah-terima-service-interface";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";

export const {
    CrudProvider: CrudTransaksiSerahTerimaProvider,
    useCrud: useCrudTransaksiSerahTerimaProvider,
} = createCrudProvider<TransaksiSerahTerimaDokumenSheetType, TransaksiSerahTerimaServiceInterface>()