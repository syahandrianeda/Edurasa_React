
import { parseImage } from "~/export/docx/parser/img-parser";
import type { cellsTableKop, TableTtd } from "../common-comps/type-comp";

export default async function parseTtd(table:HTMLTableElement):Promise<TableTtd>{
    const rows = Array.from(table.rows);
    return {
        type:'table-ttd',
        width:table.offsetWidth,
        rows:await Promise.all(
            rows.map(async(row)=>{
                return {
                    cells:await Promise.all(
                        Array.from(row.cells)
                            .filter(s=>!s.classList.contains('print:hidden'))
                            .map(async(cell)=>{
                                const konten = await deepSearchChildren(cell)
                                return {
                                    // lineHeight:parseFloat(window.getComputedStyle(cell).lineHeight),
                                    width:cell.offsetWidth,
                                    children: konten
                                }
                            })
                    )
                }
            })
        )
    }
    
};
async function deepSearchChildren(cells:HTMLTableCellElement):Promise<cellsTableKop[]>{
    const content:cellsTableKop[] = [];
    await walkNode(cells,content);
    return content
}

async function walkNode(
  node: Node,
  contents: cellsTableKop[]
): Promise<void> {
  
  
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
    if(node.hasChildNodes() && Array.from(node.childNodes).some(s=>s instanceof HTMLBRElement)){
        // kalau ada gambar, jangan ambil teksnya, biar gak dobel
        for(const child of Array.from(node.childNodes)){
            await walkNode(child,contents);
        }
        return;
    }
    const text = node.textContent?.trim();
    const style= window.getComputedStyle(node);

    if (text) {
      contents.push({
        type:'paragraph',
        text,
        fontSize:parseFloat(style.fontSize)+3.5,
        align:style.textAlign,//typeof AlignmentType
        marginTop:parseFloat(style.marginTop),
        marginBottom:parseFloat(style.marginBottom),
        fontFamily:style.fontFamily,
        isUppercase:style.textTransform ==='uppercase',
        // isBold:true,//style.fontWeight === '700',
        isBold: style.fontSynthesis === 'weight' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,
        isItalic:style.fontStyle === 'italic',
        isUnderline:style.textDecorationLine.includes('underline')
      });
    }

    return; // ⛔ penting: jangan lanjut rekursi
  }

  // element break
    if (node instanceof HTMLBRElement) {
        contents.push({
            type:'paragraph',
            text:'',    
            fontSize:12,
            align:'left',
            marginTop:0,
            marginBottom:0,
            fontFamily:'Arial',
            isUppercase:false,
            isBold:false,
            isItalic:false
        });
        return;
    }

  // ✅ ELEMENT NODE → Masuk lebih dalam
  if (node instanceof HTMLElement) {
    if (node.classList.contains("print:hidden")) return;
    
    for (const child of Array.from(node.childNodes)) {
      await walkNode(child, contents); // ✅ harus await
    }
  }
}