
import {  createCrudProvider } from '~/crud/crud-template-provider';
import type { SuratMasukServiceInterface } from '~/domain/interfaces/surat-masuk-service-interface';
import type { SuratMasukSheetType } from '~/types/surat/surat-masuk-sheet-type';

export const {
    CrudProvider: SuratMasukCrudProvider,
    useCrud: useCrudSuratMasuk,
} = createCrudProvider<SuratMasukSheetType, SuratMasukServiceInterface>()