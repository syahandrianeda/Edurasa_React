import mammoth from "mammoth";

export async function docxToHtml(
    file: File
): Promise<string> {
    const buffer = await file.arrayBuffer();
    
    const result =
        await mammoth.convertToHtml({
            arrayBuffer: buffer,
        });
    

    return result.value;
}