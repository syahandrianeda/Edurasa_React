
import {  createCrudProvider } from '~/crud/crud-template-provider';
import type { KaldikServiceInterface } from '~/domain/interfaces/kaldik-service-interface';
import type { KaldikType } from '~/types/kaldik';

export const {
    CrudProvider: KaldikCrudProvider,
    useCrud: useKaldikCrud,
} = createCrudProvider<KaldikType, KaldikServiceInterface>()