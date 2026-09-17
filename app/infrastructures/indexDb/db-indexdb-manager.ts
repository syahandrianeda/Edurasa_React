const STORES = {
    "datasiswa" : 'id', 
    "trial_kalender": 'idbaris',
    'mapel' : 'idbaris'
 } as const
// infra/indexeddb/IndexedDBManager.ts


export class IndexedDBManager {
  private static DB_NAME = "edurasa-db"
  private static DB_VERSION = 4

  static open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION)

      request.onupgradeneeded = () => {
        const db = request.result
        // STORES.forEach(store => {
        //   if (!db.objectStoreNames.contains(store)) {
        //     db.createObjectStore(store, { keyPath: "id" })
        //   }
        // })
        Object.entries(STORES).forEach(
          ([storeName, keyPath]) => {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, {
                keyPath,
              });
            }
          }
        );
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}
