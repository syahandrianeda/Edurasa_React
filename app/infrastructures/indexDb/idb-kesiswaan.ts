import type { SiswaType } from "~/types/siswa";
import { openDB } from "./db";
import { isExpired, setCacheTime } from "./meta-indb";


const STORE = "DataSiswa";

export async function getDataSiswa(id: number): Promise<SiswaType | null> {
    const db = await openDB();

    return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE, "readonly");
            const store = tx.objectStore(STORE);
            const req = store.get(id);

            req.onsuccess = () => resolve(req.result ?? null);
            req.onerror = () => reject(req.error);
        });
}

export async function saveDataSiswa(DataSiswa: SiswaType): Promise<void> {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        store.put(DataSiswa);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function clearDataSiswas() {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
}
export async function getAllDataSiswa(): Promise<SiswaType[]>{
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const req = store.getAll();

        req.onsuccess = () => resolve(req.result ?? []);
        req.onerror = () => reject(req.error);
    });
}
// export async function getRombelList() {
//     const expired = await isExpired(STORE, 1000 * 60 * 10);

//     if (!expired) {
//         const cached = await getAllDataSiswa();
//         if (cached.length) return cached;
//     }

//     const fresh = await fetchRombelFromAPI();
//     // await saveRombels(fresh);
//     await setCacheTime("rombels");

//     return fresh;
// }