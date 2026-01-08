const DB_NAME = "edurasa-db";
const DB_VERSION = 1;

export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains("datasiswa")) {
            db.createObjectStore("datasiswa", { keyPath: "id" });
        }

        // if (!db.objectStoreNames.contains("rombels")) {
        //     db.createObjectStore("rombels", { keyPath: "id" }); // }

        // if (!db.objectStoreNames.contains("meta")) {
        //     db.createObjectStore("meta", { keyPath: "key" });
        // }
        
    };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
