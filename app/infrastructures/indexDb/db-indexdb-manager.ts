const STORES = {
    datasiswa : 'id', 
    mapel : 'id',
    bank_soal: 'idbaris',
    kalender: 'idbaris',
    taksonomi_bloom: 'idbaris',
    faseA: 'idbaris',
    faseB: 'idbaris',
    faseC: 'idbaris',
    elemen_cp:'idbaris',
    Atp:'idbaris',
    jp_mapel:'idbaris',
    jadwal_mapel:'idbaris',
    setting_jadwal:'idbaris',
    kegiatan_nonkbm:'idbaris',
    prota:'idbaris',
    paket_soal:'idbaris',
    publikasi_paket: 'idbaris'
 } as const
// infra/indexeddb/IndexedDBManager.ts


export class IndexedDBManager {
  private static DB_NAME = "edurasa-db"
  private static DB_VERSION = 5

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
