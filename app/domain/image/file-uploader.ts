import { normalizeFileName } from "~/lib/normalized-filename";

export interface EncodedFile {
    base64: string;
    mimeType: string;
    fileName: string;
    extension: string
}

export async function encodeFileToBase64(
    file: File
): Promise<EncodedFile> {
    const base64 = await readFileAsBase64(file);
    const nama = normalizeFileName(file.name)
    return {
        base64,
        mimeType: file.type || "application/octet-stream",
        fileName: nama,
        extension: nama.split('.').pop() ?? ".txt"
    };
}

function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            // buang prefix data:mime;base64,
            resolve(result.split(",")[1]);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
const IMAGE_MIME = ["image/jpeg", "image/png", "image/webp"];

export function isImageFile(file: File): boolean {
    return IMAGE_MIME.includes(file.type);
}

export function dataURLToFile(dataUrl: string, fileName: string): File {
    const [meta, base64] = dataUrl.split(",");
    const mime = meta.match(/:(.*?);/)?.[1] ?? "";

    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return new File([bytes], fileName, { type: mime });
}
