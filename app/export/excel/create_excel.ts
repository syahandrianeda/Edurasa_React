import ExcelJS, { type Alignment } from "exceljs";
import { saveAs } from "file-saver";
import type { ParsedElementEdura } from "../word-edura/parser/common-comps/type-parsed";
import getImageExtension from "./get-image-extension-for-excel";


export async function MyCreateExcel(parse:ParsedElementEdura[],title:string){
 /** tentukan jumlah sel yang dimerge */
    const findTable = parse.find((item) => item.type === "table");
    const findHeading = parse.filter((item) => item.type === "heading");
    if(!findTable){
        alert("Tidak ditemukan tabel yang dapat diexport. Pastikan laman memiliki tabel yang dapat diexport.");
        return;
    }
    const rows = findTable.rows;
    const totalSel = Math.max(...rows.map(r=>r.cells.length));
    const totalHeading = findHeading?.length;
    const additionalRow = totalHeading ? totalHeading + 2 : 1; // tambahkan baris tambahan untuk heading jika ada
    /** buat dan setting property excel */
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("created_by_SyahandrianEda");
    /** isikan heading jika ada */
    if(findHeading.length > 0){
        findHeading.forEach((heading,i)=>{  
            const row = worksheet.getRow(i+1);
            row.getCell(1).value = heading.text;
            row.getCell(1).font = {
                size: Math.floor(heading.fontSize*0.5)||10,
                bold: heading.isBold,
                italic: heading.isItalic,
                name: 'Arial Black',
            };
            worksheet.mergeCells(i+1, 1, i+1, totalSel);
            const mergedCell = worksheet.getCell(i+1, 1);
            mergedCell.alignment = {
                vertical: "middle",
                horizontal: "center"
            };
        });
    }   

    findTable.rows.forEach((row,rIndex)=>{
        const excelRow = worksheet.getRow(rIndex+additionalRow);
        const currentRowIndex = rIndex+additionalRow;
        let colIndex = 1;
        /** iterasi cell yang berpotensi punya merge row dan col */
        const colFilledAllowedCol:number[] = [];

        [...Array(totalSel)].forEach((_,cIndex)=>{
            if(colIndex > totalSel){
                return;
                
            }
            const colspan =row.cells[cIndex]?.colSpan || 1;
            const rowspan =row.cells[cIndex]?.rowSpan || 1;
            /** cek dulu apakah sel ini sudah dimerge apa belum */
            const sel = excelRow.getCell(colIndex);
            
            if(sel.isMerged){
                /** jika sel ini ternyata adalah sel merge, colIndex-nya ditambah 1,
                 *  karena sel merge otomatis akan mengisi sel berikutnya, jadi colIndex dilewati saja
                 */ 
                colIndex+=colspan;
                return;
            }
            colFilledAllowedCol.push(colIndex);
            
            /** lakukan merge di sini */
            if (rowspan > 1 || colspan > 1) {
                worksheet.mergeCells(
                    currentRowIndex,
                    colIndex,
                    currentRowIndex + rowspan - 1,
                    colIndex + colspan - 1,
                    `merged_${currentRowIndex}_${colIndex}`
                );
                const masterAddress = `${sel.address}:${worksheet.getCell(currentRowIndex + rowspan - 1, colIndex + colspan - 1).address}`;
                const mergedCell = worksheet.getCell(masterAddress);

                mergedCell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            }

            /** jika sel ini belum dimerge, maka isi dulu datanya */
            colIndex+=colspan;
        });
        
        /** isikan data */
        colFilledAllowedCol.forEach((colIndex, i) => {
            const cell = excelRow.getCell(colIndex);
            const col = worksheet.getColumn(colIndex);
            const cellData = row.cells[i];
            const joinText = cellData?.children.filter(s=>s.type === 'text').map(s=>s.value).join("\n");
            const hAlign = cellData?.children.find(s=>s.type === 'text')?.align;//
            const align = cellData?.verticalAlign  as Alignment['vertical'] || 'top';
            const bg = cellData?.shading?.bg==='000000' ? 'FFFFFF' : cellData?.shading?.bg ?? 'FFFFFF';
            
            /** properti sel diatur berdasarkan data dari cellData */
            col.width = cellData?.width ? cellData.width/7 : 15;
            
            cell.style = {
                alignment: {
                    vertical: align,
                    horizontal: (hAlign==='start'? 'left' : hAlign === 'end' ? 'right' : hAlign) as Alignment['horizontal'] || 'left',
                    wrapText: true
                },
                border:{
                    top: { style: 'thin' },
                    left: { style: cellData?.borders.left.size === 0 ? undefined : 'thin'  },
                    bottom: { style: 'thin' },
                    right: { style: cellData?.borders.right.size === 0 ? undefined : 'thin'  }
                },
                font: {
                    name: 'Arial',
                    size: 8,
                },
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: `FF${bg || 'FFFFFFFF'}` },
                },
                numFmt: cellData.typeData === 'number' ? '0' : '@',
                
            }
            
            if(joinText){
                cell.value = cellData.typeData === 'number' ? parseFloat(joinText) : joinText;
                
            }

            /** isikan data image        */
            const img = cellData?.children.find(s=>s.type === 'image-excel');
            if(img){
                const buffer = img.data ;//as unknown as ExcelJS.Buffer;
                const extension = getImageExtension(img.data);
                    const imageId = workbook.addImage({
                    base64:buffer ,
                    extension,
                    });
                    worksheet.addImage(imageId, {
                        tl: { col: ((colIndex - 1)+0.5), row: (currentRowIndex - 1) },
                        ext: { width: img.width, height: img.height },
                    });
                    const rowHeight = excelRow.height || 15;
                    const colWidth = worksheet.getColumn(colIndex).width || 8.43; // default column width
                    const imgHeightInExcel =img.height + (rowHeight * 0.5); // (img.height / 96) * 72; // convert px to points
                    const imgWidthInExcel = img.width ;//* 0.75;  // convert px to points
                    if(imgHeightInExcel > rowHeight){
                        excelRow.height = imgHeightInExcel;
                    }               
                    if(imgWidthInExcel > (colWidth * 7)){ // convert column width to points
                        worksheet.getColumn(colIndex).width = imgWidthInExcel ;/// 7;
                    }
                    cell.style={
                        alignment : {
                            vertical: 'bottom',
                            horizontal: 'center',
                            // wrapText: true
                        },
                        font: {
                            name: 'Arial',
                            size: 8,
                        }
                    }
                }



        })
        
    });
    const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        saveAs(blob, `${title}.xlsx`);

}