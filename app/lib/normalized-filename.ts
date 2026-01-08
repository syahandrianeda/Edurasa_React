export function normalizeFileName(
    input: string,
    options?: {
        replacement?: string;
        maxLength?: number;
        preserveExtension?: boolean;
    }
): string {
    const {
        replacement = "_",
        maxLength = 120,
        preserveExtension = true,
    } = options ?? {};

    const trimmed = input.trim();

    let name = trimmed;
    let extension = "";

    if (preserveExtension) {
        const lastDot = trimmed.lastIndexOf(".");
        if (lastDot > 0) {
            name = trimmed.slice(0, lastDot);
            extension = trimmed.slice(lastDot).toLowerCase();
        }
    }

    const normalized = name
        .normalize("NFKD")                // é → e
        .replace(/[\u0300-\u036f]/g, "")  // hapus diacritics
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, replacement) // karakter ilegal
        .replace(new RegExp(`${replacement}{2,}`, "g"), replacement)
        .replace(new RegExp(`^${replacement}|${replacement}$`, "g"), "");

    const finalName = normalized.slice(0, maxLength);

    return preserveExtension
        ? `${finalName}${extension}`
        : finalName;
}
