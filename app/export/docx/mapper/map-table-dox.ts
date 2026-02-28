import {
  Table,
  TableRow,
  TableCell,
  Paragraph,
  TextRun,
  ImageRun,
  WidthType,
  AlignmentType,
} from "docx";
type TableCellContent =
  | { type: "text"; value: string }
  | { type: "image"; src: string; width: number; height: number };

interface ParsedTableCell {
  contents: TableCellContent[];
  width: number;
  colSpan?: number;
  rowSpan?: number;
  backgroundColor: string;
  textAlign: string;
  padding: string;
  bold: boolean;
  border: string;
}

interface ParsedTable {
  type: "table";
  width: number;
  rows: {
    cells: ParsedTableCell[];
  }[];
}


export async function mapTableToDocx(
  tableNode: ParsedTable
): Promise<Table> {
  const rows: TableRow[] = [];

  for (const row of tableNode.rows) {
    const docxCells: TableCell[] = [];

    for (const cell of row.cells) {
      const paragraphs: Paragraph[] = [];

      for (const content of cell.contents) {
        if (content.type === "text") {
          paragraphs.push(
            new Paragraph({
              alignment: mapAlignment(cell.textAlign),
              children: [
                new TextRun({
                  text: content.value,
                  bold: cell.bold,
                }),
              ],
            })
          );
        }

        if (content.type === "image") {
          const buffer = await loadImageAsArrayBuffer(content.src);

          paragraphs.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: buffer,
                  transformation: {
                    width: content.width,
                    height: content.height,
                  },
                }),
              ],
            })
          );
        }
      }

      docxCells.push(
        new TableCell({
          columnSpan: cell.colSpan,
          rowSpan: cell.rowSpan,
          width: {
            size: cell.width,
            type: WidthType.DXA,
          },
          shading: {
            fill: normalizeColor(cell.backgroundColor),
          },
          children: paragraphs.length ? paragraphs : [new Paragraph("")],
        })
      );
    }

    rows.push(new TableRow({ children: docxCells }));
  }

  return new Table({
    width: {
      size: tableNode.width,
      type: WidthType.DXA,
    },
    rows,
  });
}

function mapAlignment(
  align: string
): AlignmentType {
  switch (align) {
    case "center":
      return AlignmentType.CENTER;
    case "right":
      return AlignmentType.RIGHT;
    case "justify":
      return AlignmentType.JUSTIFIED;
    default:
      return AlignmentType.LEFT;
  }
}

async function loadImageAsArrayBuffer(
  src: string
): Promise<ArrayBuffer> {
  const res = await fetch(src);
  return await res.arrayBuffer();
}

function normalizeColor(color: string): string {
  if (color.startsWith("rgb")) {
    const values = color.match(/\d+/g);
    if (!values) return "FFFFFF";

    const hex = values
      .map(v => Number(v).toString(16).padStart(2, "0"))
      .join("");

    return hex.toUpperCase();
  }

  return color.replace("#", "") || "FFFFFF";
}
