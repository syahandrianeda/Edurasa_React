// @ts-ignore Mammoth does not provide TypeScript declarations.
import mammoth from "mammoth";

export async function docxToRawText(
    file: File
): Promise<string> {
    const buffer = await file.arrayBuffer();
    const options = {
            convertImage: mammoth.images.imgElement(function(image: {
                read: (encoding: string) => Promise<string>;
                contentType: string;
            }) {
                return image.read("base64").then(function(imageBuffer) {
                    return {
                        src: "data:" + image.contentType + ";base64," + imageBuffer
                    };
                });
            })
        };
    const result = await mammoth.extractRawText({arrayBuffer:buffer})

    return result.value;
}