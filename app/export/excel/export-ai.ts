import ExcelJS from "exceljs";
import type { BorderSideCommon, BorderTypeCommon, CellContentTypeNode, TableParseCommon } from "../word-edura/parser/common-comps/type-table";
import { saveAs } from "file-saver";

const occupied = new Map<string, boolean>();

function markOccupied(r: number, c: number) {
    occupied.set(`${r}:${c}`, true);
}

function isOccupied(r: number, c: number) {
    return occupied.get(`${r}:${c}`);
}

export async function exportTableCommonToExcel(
    data: TableParseCommon,
    fileName = "export"
) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    let currentRowIndex = 1;
    for (let r = 0; r < data.rows.length; r++) {
    const rowData = data.rows[r];
    let colIndex = 1;

    for (let c = 0; c < rowData.cells.length; c++) {
        const cellData = rowData.cells[c];

        // 🔥 SKIP kolom yang sudah kena merge
        while (isOccupied(currentRowIndex, colIndex)) {
            colIndex++;
        }

        const cell = worksheet.getCell(currentRowIndex, colIndex);
        // ========================
        // 1️⃣ HANDLE TEXT CONTENT
        // ========================
        const textNodes = cellData.children.filter(
            (child) => child.type === "text"
        ) as CellContentTypeNode[];

        if (textNodes.length > 0) {
            const combinedText = textNodes
            .map((t) =>
                t.isUppercase ? t.value.toUpperCase() : t.value
            )
            .join("\n");

            cell.value = combinedText;

            const first = textNodes[0];

            cell.font = {
            name: first.fontFamily,
            size: first.fontSize,
            bold: first.isBold,
            italic: first.isItalic,
            };

            cell.alignment = {
            // vertical:
            //   cellData.verticalAlign === "middle"
            //     ? "middle"
            //     : cellData.verticalAlign || "top",
            horizontal: first.align as any,
            wrapText: true,
            };
        }

        // ========================
        // 2️⃣ HANDLE IMAGE CONTENT
        // ========================
        const imageNodes = cellData.children.filter(
            (child: any) => child.type === "image"
        );

        for (const img of imageNodes as any[]) {
            if (!img.data) continue; // Uint8Array

            const imageId = workbook.addImage({
            buffer: img.data,//,uint8ToArrayBuffer(img.data),
            extension: img.extension || "png",
            });

            worksheet.addImage(imageId, {
            tl: { col: colIndex - 1, row: currentRowIndex - 1 },
            ext: {
                width: img.width || 100,
                height: img.height || 100,
            },
            });

            worksheet.getRow(currentRowIndex).height =
            (img.height || 100) * 0.75;
        }

        // ========================
        // 3️⃣ HANDLE MERGE
        // ========================
        // if (cellData.colSpan > 1 || cellData.rowSpan > 1) {
        //   worksheet.mergeCells(
        //     currentRowIndex,
        //     colIndex,
        //     currentRowIndex + cellData.rowSpan - 1,
        //     colIndex + cellData.colSpan - 1
        //   );
        // }
        const rowSpan = cellData.rowSpan || 1;
        const colSpan = cellData.colSpan || 1;

        if (rowSpan > 1 || colSpan > 1) {
            worksheet.mergeCells(
            currentRowIndex,
            colIndex,
            currentRowIndex + rowSpan - 1,
            colIndex + colSpan - 1
            );

            // 🔥 Tandai semua area merge sebagai occupied
            for (let rr = 0; rr < rowSpan; rr++) {
            for (let cc = 0; cc < colSpan; cc++) {
                markOccupied(
                currentRowIndex + rr,
                colIndex + cc
                );
            }
            }
        } else {
            markOccupied(currentRowIndex, colIndex);
        }

        // colIndex += colSpan;
    


      // ========================
      // 4️⃣ HANDLE BACKGROUND
      // ========================
        if (cellData.shading?.bg) {
            cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: hexToARGB(cellData.shading.bg),
            },
            };
        }

        // ========================
        // 5️⃣ HANDLE BORDER
        // ========================
        cell.border = convertBorder(cellData.borders);

        // ========================
        // 6️⃣ HANDLE COLUMN WIDTH
        // ========================
        if (cellData.width) {
            worksheet.getColumn(colIndex).width =
            cellData.width / 7; // konversi px → excel approx
        }

        colIndex += cellData.colSpan;
        }

        currentRowIndex++;
    }
    /**
     * const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        saveAs(blob, `${title}.xlsx`);
    */
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName+'.xlsx');
}

function convertBorder(borders: BorderTypeCommon) {
    const mapSide = (side: BorderSideCommon) => ({
        style: convertBorderStyle(side.style),
        color: { argb: hexToARGB(side.color) },
    });

    return {
        top: mapSide(borders.top),
        right: mapSide(borders.right),
        bottom: mapSide(borders.bottom),
        left: mapSide(borders.left),
    };
}

function hexToARGB(hex: string) {
    const cleaned = hex.replace("#", "");
    return "FF" + cleaned.toUpperCase();
}
function convertBorderStyle(style: string): any {
    const map: Record<string, any> = {
        solid: "thin",
        dashed: "dashed",
        dotted: "dotted",
        double: "double",
    };
    return map[style] || "thin";
}
