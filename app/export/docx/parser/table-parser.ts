import type { TableCellContent } from "./node-parser-type"
import { parseImage } from "./img-parser"
import { resolveTailwindColor } from "./colors-tailwind-to-word"


export async function parseTable(table: HTMLTableElement) {
    
    const rows = Array.from(table.rows)

    return {
        type: "table" as 'table',
        width: table.offsetWidth,
        rows: await Promise.all(
              rows.map(async (row) => {
                return {
                  cells: await Promise.all(
                    Array.from(row.cells)
                      .filter(cell => !cell.classList.contains("print:hidden"))
                      .map(async (cell) => {

                        const konten = await parseCellContent(cell); // ✅ await

                        const style = window.getComputedStyle(cell);

                        const paddingTop = parseFloat(style.paddingTop);
                        const paddingRight = parseFloat(style.paddingRight);
                        const paddingBottom = parseFloat(style.paddingBottom);
                        const paddingLeft = parseFloat(style.paddingLeft);
                        const bgColorRaw = style.backgroundColor;//??'FFFFFF';
                        const bgColorHex = getEffectiveBackground(cell);//extractBackgroundColor(cell);///normalizeColorToHex(bgColorRaw);// normalizeColor(bgColorRaw);//
                        console.log('sel warna', bgColorHex, style.backgroundColor)
                        return {
                            text: cell.textContent ?? "",
                            width: cell.offsetWidth,
                            colSpan: cell.colSpan || undefined,
                            rowSpan: cell.rowSpan || undefined,
                            backgroundColor: cell.tagName==='TH'?'DDDDDD':bgColorHex,
                            textAlign: style.textAlign,
                            bold: style.fontWeight === "700",
                            border:'.5pt solid black',
                            align:style.alignContent,
                            noWrap:style.whiteSpace ==='nowrap',
                            padding:{
                              top: paddingTop,
                              bottom:paddingBottom,
                              left:paddingLeft,
                              right:paddingRight,
                            },
                            children: konten
                        };
                      })
                  )
                };
              })
            )

    }
}

async function parseCellContent(cell: HTMLTableCellElement): Promise<TableCellContent[]> {
  const contents: TableCellContent[] = [];

  await walkNode(cell, contents);

  return contents;
  

}

async function walkNode(
  node: Node,
  contents: TableCellContent[]
): Promise<void> {
  // ✅ TEXT NODE
  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.textContent?.trim();
    if (value) {
      contents.push({
        type: "text",
        value,
      });
    }
    return;
  }
  
  // ✅ IMAGE
  if (node instanceof HTMLImageElement) {
    if (node.classList.contains("print:hidden")) return;
    
    const src = await parseImage(node as  HTMLImageElement)
    
    if(src){
      contents.push(src);
    }
    return
  }
   // ✅ PARAGRAPH <p>
  if (node instanceof HTMLParagraphElement) {
    if (node.classList.contains("print:hidden")) return;

    const text = node.textContent?.trim();

    if (text) {
      contents.push({
        type: "paragraph",
        text,
        classList: Array.from(node.classList),
      });
    }

    return; // ⛔ penting: jangan lanjut rekursi
  }

  // ✅ ELEMENT NODE → Masuk lebih dalam
  if (node instanceof HTMLElement) {
    if (node.classList.contains("print:hidden")) return;
    
    for (const child of Array.from(node.childNodes)) {
      await walkNode(child, contents); // ✅ harus await
    }
  }
}
function extractBackgroundColorE(el: HTMLElement): string | null {
  const style = window.getComputedStyle(el);
  const bg = style.backgroundImage;

  // Jika gradient
  if (bg && bg.includes("gradient")) {
    const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = Number(match[1]);
      const g = Number(match[2]);
      const b = Number(match[3]);
      return rgbToHex(r+'+'+ g+''+ b);
    }
  }

  // Jika normal color
  const bgColor = style.backgroundColor;
  if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
    return rgbToHex(bgColor);
  }

  return null;
}

function getEffectiveBackground(td: HTMLElement): string {
  const tdStyle = window.getComputedStyle(td);
  if (tdStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
    return normalizeColorToHex(tdStyle.backgroundColor);
  }

  const tr = td.parentElement;
  if (tr) {
    const trStyle = window.getComputedStyle(tr);
    if (trStyle.backgroundColor !== "rgba(0, 0, 0, 0)") {
      return normalizeColorToHex(trStyle.backgroundColor);
    }
  }

  return "FFFFFF"; // default white
}

function extractBackgroundColor(td: HTMLElement): string {
  // 1️⃣ Coba resolve dari class tailwind
  for (const cls of td.classList) {
    const hex = resolveTailwindColor(cls);
    if (hex) return hex;
  }

  // 2️⃣ Fallback ke computedStyle
  return normalizeColorToHex(
    window.getComputedStyle(td).backgroundColor
  );
}

function normalizeColorToHex(color: string): string {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return "FFFFFF";//"000000";

  ctx.fillStyle = color;
  const computed = ctx.fillStyle;

  let hex = "";

  if (computed.startsWith("#")) {
    hex = computed.replace("#", "");
  } else {
    const match = computed.match(/\d+/g);
    if (!match || match.length < 3) return "FFFFFF";

    hex = [match[0], match[1], match[2]]
      .map(v => Number(v).toString(16).padStart(2, "0"))
      .join("");
  }

  return hex.length === 6 ? hex.toUpperCase() : "FFFFFF";
}

function normalizeColor(color: string): string {
  const temp = document.createElement("div");
  temp.style.color = color;
  document.body.appendChild(temp);

  const rgb = window.getComputedStyle(temp).color;

  document.body.removeChild(temp);

  return rgbToHex(rgb);
}
function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g);
  if (!result) return "000000";

  const r = parseInt(result[0]).toString(16).padStart(2, "0");
  const g = parseInt(result[1]).toString(16).padStart(2, "0");
  const b = parseInt(result[2]).toString(16).padStart(2, "0");

  return `${r}${g}${b}`.toUpperCase();
}
