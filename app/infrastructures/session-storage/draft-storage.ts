export function saveDraft<T>(
    key: string,
    data: T
): void {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    } catch (error) {
        console.error(
            "Gagal menyimpan draft:",
            error
        );
    }
}

export function getDraft<T>(
    key: string
): T | null {
    try {

        const raw =
            localStorage.getItem(key);

        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as T;

    } catch (error) {

        console.error(
            "Gagal membaca draft:",
            error
        );

        return null;
    }
}

export function removeDraft(
    key: string
): void {
    localStorage.removeItem(key);
}

export function hasDraft(
    key: string
): boolean {
    return localStorage.getItem(key) !== null;
}