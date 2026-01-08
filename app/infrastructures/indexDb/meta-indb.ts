import { openDB } from "./db";

const STORE = "meta";

export async function setCacheTime(key: string) {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({
        key,
        updatedAt: Date.now(),
    });
}

export async function isExpired(key: string, ttlMs: number): Promise<boolean> {
    const db = await openDB();
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);

    return new Promise((resolve) => {
        req.onsuccess = () => {
        if (!req.result) return resolve(true);
        resolve(Date.now() - req.result.updatedAt > ttlMs);
        };
    });
}
