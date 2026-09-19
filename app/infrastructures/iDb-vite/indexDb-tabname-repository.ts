import { IndexedDBRepository } from "./indexDb-repoitory";


export class IndexDbTabNameRepository< T > extends IndexedDBRepository<T> {
  constructor(tabName: string) {
    super(tabName);
  }
}