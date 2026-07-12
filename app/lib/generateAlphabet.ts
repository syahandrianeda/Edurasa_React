export function generateAlphabet(count: number): string[] {
    return Array.from(
        { length: Math.min(count, 26) },
        (_, i) => String.fromCharCode(65 + i)
    );
}

