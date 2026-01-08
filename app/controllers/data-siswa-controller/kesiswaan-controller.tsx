
import {  createCrudProvider } from '~/crud/crud-template-provider';
import type KesiswaanServiceInterface from '~/domain/interfaces/kesiswaan-service-interface';
import type { SiswaType } from '~/types/siswa';

export const {
    CrudProvider: SiswaCrudProvider,
    useCrud: useSiswaCrud,
} = createCrudProvider<SiswaType, KesiswaanServiceInterface>()