export type ImageSourceType =
    | "file"
    | "base64"
    | "blob"
    | "image-url"
    | "url"
    | "unknown";

export interface ImageSourceInfo {
    type: ImageSourceType;
    value: File | string | null;

    /**
     * true jika sumber ini dipastikan merupakan gambar.
     */
    isImage: boolean;
}

const IMAGE_EXTENSION_REGEX =
    /\.(png|jpe?g|gif|bmp|webp|svg|avif|ico|tiff?)(\?.*)?(#.*)?$/i;

const BASE64_REGEX =
    /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/]+=*$/;

export function parseImageSource(value: unknown): ImageSourceInfo {

    if (value instanceof File) {

        return {
            type: "file",
            value,
            isImage: value.type.startsWith("image/"),
        };

    }

    if (typeof value !== "string") {

        return {
            type: "unknown",
            value: null,
            isImage: false,
        };

    }

    if (BASE64_REGEX.test(value)) {

        return {
            type: "base64",
            value,
            isImage: true,
        };

    }

    try {

        const url = new URL(value);

        if (url.protocol === "blob:") {

            return {
                type: "blob",
                value,
                isImage: true,
            };

        }

        if (
            url.protocol === "http:" ||
            url.protocol === "https:"
        ) {

            if (IMAGE_EXTENSION_REGEX.test(url.pathname)) {

                return {
                    type: "image-url",
                    value,
                    isImage: true,
                };

            }

            return {
                type: "url",
                value,
                isImage: false,
            };

        }

    } catch {
        //
    }

    return {
        type: "unknown",
        value: null,
        isImage: false,
    };

}

/** verify URL */
export async function verifyImageUrl(
    url: string,
): Promise<boolean> {

    try {

        const response = await fetch(url, {
            method: "HEAD",
        });

        if (!response.ok) {
            return false;
        }

        const contentType =
            response.headers.get("content-type");

        return contentType?.startsWith("image/") ?? false;

    } catch {

        return false;

    }

}
/** helper 
 * contoh penggunaan:
 * ```
 * const source = await resolveImageSource(value);

switch (source.type) {

    case "file":
        console.log("Upload file");
        break;

    case "base64":
        console.log("Base64");
        break;

    case "blob":
        console.log("Blob URL");
        break;

    case "image-url":
        console.log("Verified image URL");
        break;

    case "url":
        console.log("Valid URL tetapi bukan gambar");
        break;

    default:
        console.log("Unknown");
}
 * ```
*/
export async function resolveImageSource(
    value: unknown,
): Promise<ImageSourceInfo> {

    const source = parseImageSource(value);

    if (source.type !== "url") {
        return source;
    }

    const verified = await verifyImageUrl(
        source.value as string,
    );

    return {
        ...source,
        type: verified ? "image-url" : "url",
        isImage: verified,
    };

}
