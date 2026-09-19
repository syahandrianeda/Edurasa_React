import { IndexedDBManager } from "../indexDb/db-indexdb-manager";

export class IndexedDBRepository< T > {
  constructor( protected readonly storeNameSource: string ) {}

  get storeName():string{
    return this.storeNameSource.replace('trial_','');
  }

  async hasStore(): Promise<boolean> {
    const db = await IndexedDBManager.open();

    return db.objectStoreNames.contains(
      this.storeName
    );
  }

  async getAll(): Promise<T[]> {
    const db = await IndexedDBManager.open();

    if (!db.objectStoreNames.contains(this.storeName)) {
      return [];
    }

    const tx = db.transaction(
      this.storeName,
      "readonly"
    );

    const request = tx .objectStore(this.storeName) .getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async save(item: T): Promise<boolean> {
    const db = await IndexedDBManager.open();

    if (!db.objectStoreNames.contains(this.storeName)) {
      return false;
    }

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    tx.objectStore(this.storeName).put(item);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveBulk(data: T[]): Promise<boolean> {
    const db = await IndexedDBManager.open();

    if (!db.objectStoreNames.contains(this.storeName)) {
      return false;
    }

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    const store = tx.objectStore(this.storeName);

    data.forEach((item) => {
      store.put(item);
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveBulkAgain(data: T[]): Promise<boolean> {
    const db = await IndexedDBManager.open();

    if (!db.objectStoreNames.contains(this.storeName)) {
      return false;
    }

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
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(): Promise<boolean> {
    const db = await IndexedDBManager.open();

    if (!db.objectStoreNames.contains(this.storeName)) {
      return false;
    }

    const tx = db.transaction(
      this.storeName,
      "readwrite"
    );

    tx.objectStore(this.storeName).clear();

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }
}