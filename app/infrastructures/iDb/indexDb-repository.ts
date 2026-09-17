import { IndexedDBManager } from "../indexDb/db-indexdb-manager";


export class IndexedDBRepository<T extends { idbaris: number }> {
  constructor(
    protected readonly storeName: string
  ) {}

  async getAll(): Promise<T[]> {
    const db = await IndexedDBManager.open();
    
    const tx = db.transaction(
      this.storeName,
      "readonly"
    );

    const store = tx.objectStore(this.storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async save(item: T): Promise<void> {
    const db = await IndexedDBManager.open();

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );
    db.createObjectStore(this.storeName, {keyPath:'idbaris'});
    tx.objectStore(this.storeName).put(item);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveBulk(data: T[]): Promise<void> {
    const db = await IndexedDBManager.open();

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    const store = tx.objectStore(this.storeName);

    data.forEach((item) => {
      store.put(item);
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveBulkAgain(data: T[]): Promise<void> {
    const db = await IndexedDBManager.open();

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    const store = tx.objectStore(this.storeName);
    
    store.clear();

    data.forEach((item) => {
      store.put(item);
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(): Promise<void> {
    const db = await IndexedDBManager.open();

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    tx.objectStore(this.storeName).clear();

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}