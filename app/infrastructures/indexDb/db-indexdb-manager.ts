const STORES = ["datasiswa", "kaldik","kurikulum"]
// infra/indexeddb/IndexedDBManager.ts


export class IndexedDBManager {
  private static DB_NAME = "edurasa-db"
  private static DB_VERSION = 2

  static open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION)

      request.onupgradeneeded = () => {
        const db = request.result
        STORES.forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: "id" })
          }
        })
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}
