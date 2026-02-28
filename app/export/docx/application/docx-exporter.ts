import { Packer } from "docx"
import { saveAs } from "file-saver"

export async function exportDocx(doc: any, fileName: string) {
    const blob = await Packer.toBlob(doc)
    saveAs(blob, fileName)
}
