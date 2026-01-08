import EduraIndexDB from "./indexdb-class"

// IndexedDBService.ts
class IndexedDBService {
  private static instance: IndexedDBService
  private dbs = new Map<string, EduraIndexDB>()

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexedDBService()
    }
    return this.instance
  }

  getStore(store: string) {
    if (!this.dbs.has(store)) {
      this.dbs.set(store, new EduraIndexDB(store))
    }
    return this.dbs.get(store)!
  }

  async destroyAll() {
    for (const db of this.dbs.values()) {
      await db.destroy()
    }
    this.dbs.clear()
  }
}

export const indexedDBService = IndexedDBService.getInstance()
