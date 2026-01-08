import type { SiswaType } from "~/types/siswa"
import { IndexedDBManager } from "./db-indexdb-manager"

// domain/repositories/SiswaRepository.ts
export class IndDbSiswaRepository {

  async getAll(): Promise<SiswaType[]> {
    const db = await IndexedDBManager.open()
    const tx = db.transaction("datasiswa", "readonly")
    const store = tx.objectStore("datasiswa")

    const req = store.getAll()

    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result as SiswaType[])
      req.onerror = () => reject(req.error)
    })
  }

  async saveBulk(data: SiswaType[]): Promise<void> {
    const db = await IndexedDBManager.open()
    const tx = db.transaction("datasiswa", "readwrite")
    const store = tx.objectStore("datasiswa")

    data.forEach(item => store.put(item))

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }
}
