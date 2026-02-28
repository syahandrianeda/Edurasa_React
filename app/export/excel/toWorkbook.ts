
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import fetchImage from "./fetch-image";
import getImageExtension from "./get-image-extension-for-excel";

export async function toWorkbook(ref: React.RefObject<HTMLElement|null>, fileName: string) {
if (!ref.current) return;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Export");

    const tables = Array.from(ref.current.querySelectorAll("table"));

    let currentRow = 1;

    for (const table of tables) {
        const rows = Array.from(table.querySelectorAll("tr"));

        for (const row of rows) {
                const excelRow = worksheet.getRow(currentRow);
                const cells = Array.from(row.children) as HTMLElement[];

                let colIndex = 1;

                for (const cell of cells) {
                    const colspan = parseInt(cell.getAttribute("colspan") || "1");
                    const rowspan = parseInt(cell.getAttribute("rowspan") || "1");

                    const text = cell.innerText?.trim();
                    const images = Array.from(cell.querySelectorAll("img"));

                    // 1️⃣ TEXT
                    if (text) {
                        worksheet.getCell(currentRow, colIndex).value = text;
                    }

                    // 2️⃣ IMAGE
                    if (images.length > 0) {
                    for (const img of images) {
                        const src = img.getAttribute("src");
                        if (!src) continue;

                        const buffer = await fetchImage(src);
                        const extension = getImageExtension(src);

                        const imageId = workbook.addImage({
                        buffer,
                        extension,
                        });

                        worksheet.addImage(imageId, {
                        tl: { col: colIndex - 1, row: currentRow - 1 },
                        ext: { width: 20, height: 20 },
                        });

                        worksheet.getRow(currentRow).height = 80;
                        worksheet.getColumn(colIndex).width = 20;
                    }
                }
                // 3️⃣ HANDLE MERGE (colspan/rowspan)
                if (colspan > 1 || rowspan > 1) {
                worksheet.mergeCells(
                    currentRow,
                    colIndex,
                    currentRow + rowspan - 1,
                    colIndex + colspan - 1
                );
                }
                colIndex += colspan;
            }
            currentRow++;
        }
        currentRow += 2; // spasi antar tabel
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer]);
    saveAs(blob, `${fileName}.xlsx`);
}