// domain/image/imageResize.service.ts

export type ImageResizeOptions = {
    maxWidth: number;
    maxHeight: number;
    keepOriginalSize?: boolean;
    mimeType?: string;
};

export async function resizeImageForUpload(
    file: File,
    options: ImageResizeOptions
): Promise<string> {
    if (options.keepOriginalSize) {
        return readFileAsDataURL(file);
    }

    const img = await loadImage(file);
    const { width, height } = calculateAspectRatioFit(
        img.width,
        img.height,
        options.maxWidth,
        options.maxHeight
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL(options.mimeType ?? file.type);
}

async function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };

        img.onerror = (err) => {
            URL.revokeObjectURL(url);
            reject(err);
        };

        img.src = url;
    });
}

function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function calculateAspectRatioFit(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: Math.round(srcWidth * ratio),
        height: Math.round(srcHeight * ratio),
    };
}

/**
 * ======== CARA PAKAI =========
 * // application/upload/uploadToDrive.service.ts

const dataUrl = await resizeImageForUpload(file, {
    maxWidth: 1200,
    maxHeight: 1200,
});

await driveRepository.upload({
    fileName: file.name,
    dataUrl,
});

 */