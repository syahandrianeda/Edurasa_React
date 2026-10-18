
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export function isEqualValue(a: unknown, b: unknown): boolean {
    // Referensi sama atau nilai primitif sama
    if (Object.is(a, b)) return true;

    // Jika salah satunya null atau bukan objek
    if (
        a === null ||
        b === null ||
        typeof a !== "object" ||
        typeof b !== "object"
    ) {
        return false;
    }

    // Array harus dibandingkan sebagai array
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) return false;
        if (a.length !== b.length) return false;

        return a.every((item, index) =>
            isEqualValue(item, b[index])
        );
    }

    // Bandingkan semua key tanpa memperhatikan urutannya
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(
        (key) =>
            Object.hasOwn(b, key) &&
            isEqualValue(
                (a as Record<string, unknown>)[key],
                (b as Record<string, unknown>)[key]
            )
    );
}

export function isEqualArrayObject<T>(
    a: T[],
    b: T[]
): boolean {
    return isEqualValue(a, b);
}


export function findDifferences(
    a: unknown,
    b: unknown,
    path = "root"
): string[] {
    if (Object.is(a, b)) return [];

    if (
        a === null ||
        b === null ||
        typeof a !== "object" ||
        typeof b !== "object"
    ) {
        return [`${path}: nilai berbeda (${String(a)} vs ${String(b)})`];
    }

    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            return [`${path}: salah satu bukan array`];
        }

        if (a.length !== b.length) {
            return [
                `${path}: panjang array berbeda (${a.length} vs ${b.length})`,
            ];
        }

        return a.flatMap((item, index) =>
            findDifferences(item, b[index], `${path}[${index}]`)
        );
    }

    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;

    const keys = new Set([
        ...Object.keys(objA),
        ...Object.keys(objB),
    ]);

    return [...keys].flatMap((key) => {
        const pathKey = `${path}.${key}`;
        const hasA = Object.hasOwn(objA, key);
        const hasB = Object.hasOwn(objB, key);

        if (!hasA || !hasB) {
            return [
                `${pathKey}: ${
                    hasA ? "hanya ada di object1" : "hanya ada di object2"
                }`,
            ];
        }

        return findDifferences(objA[key], objB[key], pathKey);
    });
}
