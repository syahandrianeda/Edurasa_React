
import {  createCrudProvider } from '~/crud/crud-template-provider';
import type { SuratKeluarServiceInterface } from '~/domain/interfaces/surat-keluar-sevice-interface';
import type { SuratKeluarSheetType } from '~/types/surat/surat-keluar-sheet-type';

export const {
    CrudProvider: SuratKeluarCrudProvider,
    useCrud: useCrudSuratKeluar,
} = createCrudProvider<SuratKeluarSheetType, SuratKeluarServiceInterface>()