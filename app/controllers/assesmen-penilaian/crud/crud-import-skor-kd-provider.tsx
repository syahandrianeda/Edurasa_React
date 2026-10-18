import { createCrudProvider } from "~/crud/crud-template-provider";
import type { ImportKategoriAssesmenSkorKdServiceInterface } from "~/domain/interfaces/import-kategori-assesmen-skor-kd-service-interface";
import type { PublikasiPaketServiceInterface } from "~/domain/interfaces/publikasi-paket-service-interface";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";
import type { PublikasiPaketSheetType } from "~/types/publikasi-paket-soal/publikasi-paket-sheet-type";


export const {
    CrudProvider: CrudImportSkorKdProvider,
    useCrud: useCrudImportSkorKdProvider,
} = createCrudProvider<ValidatedResponseSiswa, ImportKategoriAssesmenSkorKdServiceInterface>()