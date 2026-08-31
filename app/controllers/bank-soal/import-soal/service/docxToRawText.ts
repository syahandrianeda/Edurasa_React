import mammoth from "mammoth";

export async function docxToRawText(
    file: File
): Promise<string> {
    const buffer = await file.arrayBuffer();
    const options = {
            convertImage: mammoth.images.imgElement(function(image) {
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