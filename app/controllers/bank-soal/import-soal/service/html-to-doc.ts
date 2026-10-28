// @ts-ignore mammoth has no declaration file available in this project.
import mammoth from "mammoth";

const mammothApi = mammoth as {
    convertToHtml(options: { arrayBuffer: ArrayBuffer }): Promise<{ value: string }>;
};

export async function docxToHtml(
    file: File
): Promise<string> {
    const buffer = await file.arrayBuffer();
    
    const result =
        await mammothApi.convertToHtml({
            arrayBuffer: buffer,
        });
    

    return result.value;
}