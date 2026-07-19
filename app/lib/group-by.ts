export function groupBy<T, K extends PropertyKey>(
    array: T[],
    keyGetter: (item: T) => K
): Record<K, T[]> {
    return array.reduce((acc, item) => {
        const key = keyGetter(item);
        (acc[key] ??= []).push(item);
        return acc;
    }, {} as Record<K, T[]>);
}

/**
 * Mengelompokkan data berdasarkan key dan memastikan objek hasil memiliki key yang terurut.
 * Menggunakan localeCompare dengan opsi numeric agar urutan seperti 1A, 1B, 10A menjadi benar.
 */
export function groupBySortKey<T, K extends string | number>(
    array: T[],
    keyGetter: (item: T) => K
): Record<K, T[]> {
    const grouped = groupBy(array, keyGetter);
    
    const sortedKeys = (Object.keys(grouped) as K[]).sort((a, b) =>
        // String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
        String(a).localeCompare(String(b))
    );

    const result = {} as Record<K, T[]>;
    sortedKeys.forEach((key) => {
        result[key] = grouped[key];
    });

    return result;
}

/**
 * Mengelompokkan data berdasarkan key, di mana urutan property pada object hasil 
 * mengikuti urutan kemunculan pertama kali (insertion order) di dalam array asal.
 */
export function groupByOriginalOrder<T, K extends string | number>(
    array: T[],
    keyGetter: (item: T) => K
): Record<K, T[]> {
    // if (!array) return {}
    const grouped = groupBy(array, keyGetter);
    const orderedKeys: K[] = [];
    const seen = new Set<K>();

    for (const item of array) {
        const key = keyGetter(item);
        if (!seen.has(key)) {
            seen.add(key);
            orderedKeys.push(key);
        }
    }

    const result = {} as Record<K, T[]>;
    orderedKeys.forEach((key) => {
        result[key] = grouped[key];
    });

    return result;
}
export type GroupResult<T>={
    key:string, 
    data:T[]
}
export function groupByToArray<T>(
    items: T[],
    getKey: (item: T) => string
): GroupResult<T>[] {
    const groups = new Map<string, T[]>();

    for (const item of items) {
        const key = getKey(item);

        if (!groups.has(key)) {
            groups.set(key, []);
        }

        groups.get(key)!.push(item);
    }

    return Array.from(groups.entries()).map(([key, data]) => ({
        key,
        data,
    }));
}