import type { cellsTableCommon, TableParseCommon } from "../common-comps/type-table";
import { parseImage } from "~/export/docx/parser/img-parser";
import { hexColorValue } from "docx";
import { resolveRgbaOrOklchToHex } from "~/lib/color-hack";

export default async function parseCommonTable(table:HTMLTableElement):Promise<TableParseCommon>{
    const row = Array.from(table.rows);
    return {
        type:'table',
        width:table.offsetWidth,
        rows:await Promise.all(row.map(async (row)=>{
            const cells = Array.from(row.cells);    
            return {
                cells:await Promise.all(
                    cells.filter(s=>!s.classList.contains('print:hidden'))
                    .map(async (cell)=>{
                        const width = cell.offsetWidth;
                        const konten = await parseCellContent(cell);
                        const style = window.getComputedStyle(cell);
                        
                        return {
                            width,
                            parentType:cell.tagName.toLowerCase() as 'td'|'th',
                            shading:{
                                bg:hexColorValue(resolveRgbaOrOklchToHex(style.backgroundColor)?.hex??"#FFFFFF"),
                                persentage:resolveRgbaOrOklchToHex(style.backgroundColor)?.a??undefined,
                                color:hexColorValue(resolveRgbaOrOklchToHex(style.color)?.hex??"#000000"),
                                detailBg:resolveRgbaOrOklchToHex(style.backgroundColor),
                                detailColor:resolveRgbaOrOklchToHex(style.color),
                            },
                            padding:{
                                top:parseFloat(style.paddingTop),
                                right:parseFloat(style.paddingRight),
                                bottom:parseFloat(style.paddingBottom),
                                left:parseFloat(style.paddingLeft)
                            },
                            verticalAlign:style.verticalAlign as 'top'|'center'|'bottom'|'middle',
                            borders:{
                                top:{
                                    color:style.borderTopColor,
                                    size:parseFloat(style.borderTopWidth),
                                    style:style.borderTopStyle
                                },
                                right:{
                                    color:style.borderRightColor,
                                    size:parseFloat(style.borderRightWidth),
                                    style:style.borderRightStyle
                                },
                                bottom:{
                                    color:style.borderBottomColor,
                                    size:parseFloat(style.borderBottomWidth),
                                    style:style.borderBottomStyle
                                },
                                left:{
                                    color:style.borderLeftColor,
                                    size:parseFloat(style.borderLeftWidth),
                                    style:style.borderLeftStyle
                                }
                            },
                            colSpan:cell.colSpan,
                            rowSpan:cell.rowSpan,
                            margins:{
                                top:parseFloat(style.marginTop),
                                right:parseFloat(style.marginRight),
                                bottom:parseFloat(style.marginBottom),
                                left:parseFloat(style.marginLeft)
                            },
                            children: konten
                        }
                    }))
            }
        }))
    }
    
}

async function parseCellContent(cell: HTMLTableCellElement): Promise<cellsTableCommon[]> {
    const contents: cellsTableCommon[] = [];
    await walkNode(cell, contents);
    return contents;
}   

async function walkNode(node: Node, contents: cellsTableCommon[]): Promise<void> {
    // ✅ TEXT NODE
    if (node.nodeType === Node.TEXT_NODE) {
        const value = node.textContent?.trim();
        const style = window.getComputedStyle(node.parentElement!);
        if (value) {
        contents.push({
            type: "text",
            value,
            fontSize:parseFloat(style.fontSize)+3.5,
            align:style.textAlign,//typeof AlignmentType
            marginTop:parseFloat(style.marginTop),
            marginBottom:parseFloat(style.marginBottom),
            fontFamily:style.fontFamily,
            isUppercase:style.textTransform ==='uppercase',
            // isBold:style.fontWeight === '700',
            isBold: style.fontSynthesis === 'weight' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,   
            isItalic:style.fontStyle === 'italic'
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
            isBold: style.fontSynthesis === 'weight' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,   
            isItalic:style.fontStyle === 'italic'
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
