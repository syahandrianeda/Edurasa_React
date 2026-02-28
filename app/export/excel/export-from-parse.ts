import ExcelJS, { type Image } from "exceljs";
import getImageExtension from "./get-image-extension-for-excel";
import { saveAs } from "file-saver";
import fetchImage from "./fetch-image";
import type { ParsedElementEdura } from "../word-edura/parser/common-comps/type-parsed";
import type { ImageNodeExcel } from "./parser/parse-image-excel";
import type { BorderSideCommon, BorderTypeCommon, CellContentTypeNode, TableParseCommon } from "../word-edura/parser/common-comps/type-table";


export default async function ToExcelFromParse(parse:ParsedElementEdura[],title:string):Promise<void>{
    /** tentukan jumlah sel yang dimerge */
    const findTable = parse.find((item) => item.type === "table");
    if(!findTable){
        alert("Tidak ditemukan tabel yang dapat diexport. Pastikan laman memiliki tabel yang dapat diexport.");
        return;
    }
    const rows = findTable.rows;
    const totalSel = Math.max(...rows.map(r=>r.cells.length));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("created_by_SyahandrianEda");
    let currentRow = 1;
    let tagRowSpanPrevious = 0;
    for(const row of rows){
        const excelRow = worksheet.getRow(currentRow);
        let colIndex = 1;
        for(const cell of row.cells){
            const colspan = cell.colSpan || 1;
            const rowspan = cell.rowSpan || 1;
            const excelCell = excelRow.getCell(colIndex);
            let isCurrentCellInRowSpan = false;
            
            /** isikan data text */
            const joinText = cell.children.filter(s=>s.type === 'text').map(s=>s.value).join("\n");
            if(joinText){
                excelRow.getCell(colIndex).value = joinText;
            }

            /** isikan data image    */
            const images = cell.children.filter(s=>s.type === 'image-excel');// as ImageNodeExcel[];
            for(const img of images){
                const buffer = img.data as unknown as ExcelJS.Buffer;
                const extension = getImageExtension(img.data);

                    const imageId = workbook.addImage({
                    buffer ,
                    extension,
                    });
                    worksheet.addImage(imageId, {
                        tl: { col: colIndex - 1, row: currentRow - 1 },
                        ext: { width: img.width, height: img.height },
                    });
                    const rowHeight = excelRow.height || 15; // default row height
                    const colWidth = worksheet.getColumn(colIndex).width || 8.43; // default column width   
                    const imgHeightInExcel = (img.height / 96) * 72; // convert px to points
                    const imgWidthInExcel = (img.width / 96) * 72;
                    if(imgHeightInExcel > rowHeight){
                        excelRow.height = imgHeightInExcel;
                    }
                    if(imgWidthInExcel > colWidth * 7.5){ // convert column width to points
                        worksheet.getColumn(colIndex).width = imgWidthInExcel / 7.5;
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
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer]);
    saveAs(blob, `${title}.xlsx`);
}
