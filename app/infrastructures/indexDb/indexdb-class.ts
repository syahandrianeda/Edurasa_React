export default class EduraIndexDB {
  // private db?: IDBDatabase
  private readonly DB_NAME = "edurasa-db"
  private readonly DB_VERSION = 1
  private readonly STORE: string

  constructor(store: string) {
    if (!store) {
        throw new Error("EduraIndexDB: store name is required");
    }
    this.STORE = store;
  }
  async open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.DB_NAME, this.DB_VERSION)

        request.onupgradeneeded = () => {
          const db = request.result

          if (!db.objectStoreNames.contains(this.STORE)) {
            db.createObjectStore(this.STORE, { keyPath: "id" })
          }
        }

        request.onsuccess = () => {
          const db = request.result
          db.onversionchange = () => db.close()
          resolve(db)
        }

        request.onerror = () => reject(request.error)
      })
  }

  async save<T extends { id: IDBValidKey }>(item: T): Promise<void> {
    const db = await this.open()
    const tx = db.transaction(this.STORE, "readwrite")
    tx.objectStore(this.STORE).put(item)

    await waitTransaction(tx)
  }

  async saveBulk<T extends { id: IDBValidKey }>(items: T[]): Promise<void> {
    const db = await this.open()
    const tx = db.transaction(this.STORE, "readwrite")
    const store = tx.objectStore(this.STORE)

    for (const item of items) {
      store.put(item)
    }

    await waitTransaction(tx)
  }

  async getAll<T>(): Promise<T[]> {
    const db = await this.open()
    const tx = db.transaction(this.STORE, "readonly")
    const req = tx.objectStore(this.STORE).getAll()

    return new Promise(resolve => {
      req.onsuccess = () => resolve(req.result as T[])
    })
  }

  async getById<T>(id: IDBValidKey): Promise<T | null> {
    const db = await this.open()
    const tx = db.transaction(this.STORE, "readonly")
    const req = tx.objectStore(this.STORE).get(id)

    return new Promise(resolve => {
      req.onsuccess = () => resolve(req.result ?? null)
    })
  }
  async destroy(): Promise<void> {
    // if (this.db) {
    //   this.db.close()
    // this.db = undefined
    // }

    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(this.DB_NAME)

      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
      req.onblocked = () => {
        console.warn("IndexedDB delete blocked")
      }
    })
  }
}

function waitTransaction(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
  
}
