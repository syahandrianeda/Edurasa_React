
import {  createCrudProvider } from '~/crud/crud-template-provider';
import type { SppdServiceInterface } from '~/domain/interfaces/sppd-service-interface';
import type { SppdSheetType } from '~/types/surat/sppd-sheet-type';

export const {
    CrudProvider: CrudSppdProvider,
    useCrud: useSppdCrudProvider,
} = createCrudProvider<SppdSheetType, SppdServiceInterface>()