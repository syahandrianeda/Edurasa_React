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
