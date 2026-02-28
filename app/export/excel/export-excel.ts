import { MyCreateExcel } from "./create_excel";
import ParsingPrintAreaExcel from "./parser/root-printarea-parse";



export default async function exportComponentToExcel(
    ref: React.RefObject<HTMLElement|null>,
    fileName: string
    ) {
    /** gerbang pertama */
    if (!ref.current || !ref) {
        alert("Laman tidak cocok untuk diexport.");
        return;
    }
    const dataParse = await ParsingPrintAreaExcel(ref.current);
    const findTable = dataParse.find((item) => item.type === "table");
    if(!findTable){
        alert("Tidak ditemukan tabel yang dapat diexport. Pastikan laman memiliki tabel yang dapat diexport.");
        return;
    }
    
    await MyCreateExcel(dataParse,fileName);
}
