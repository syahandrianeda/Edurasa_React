import type { ParsedElementEdura } from "~/export/word-edura/parser/common-comps/type-parsed";
import parseKopExcel from "./kop-excel";
import parseCommonTableExcel from "./parse-table-common";

export default async function ParsingPrintAreaExcel(element:HTMLElement):Promise<ParsedElementEdura[]>{
    const resultParsed:ParsedElementEdura[]=[];
    
        async function walk(node: HTMLElement): Promise<void> {
            const tag = node.tagName;
            const style = window.getComputedStyle(node);

            // --- TABLE ---
            if (tag === "TABLE") {
                if(node.dataset.word === 'kop'){
                    const tabelNode = await parseKopExcel(node as HTMLTableElement);
                    
                    resultParsed.push(tabelNode);
                    return;
                }
                const tableNode = await parseCommonTableExcel(node as HTMLTableElement);
                    resultParsed.push(tableNode);
                return; // jangan lanjut ke children
            }
    
            // --- HEADING ---
            if (/^H[1-6]$/.test(tag)) {
                
                resultParsed.push({
                    type: "heading",
                    level: Number(tag[1]),
                    text: node.textContent ?? "",
                    fontSize:parseFloat(style.fontSize),
                    lineHeight:parseFloat(style.lineHeight),
                    // align:style.textAlig,
                    align:style.textAlign,
                    marginTop:parseFloat(style.marginTop),
                    marginBottom:parseFloat(style.marginBottom),
                    fontFamily:style.fontFamily,
                    isUppercase:style.textTransform ==='uppercase',
                    isItalic:style.fontStyle === 'italic',
                    isBold: style.fontSynthesis === 'weight' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,
                });
                // return;
            }
            
            
            // --- WALK CHILDREN (async-safe) ---
            for (const child of Array.from(node.children)) {
                await walk(child as HTMLElement);
            }
        }
    
    await walk(element);
    return resultParsed;
}
