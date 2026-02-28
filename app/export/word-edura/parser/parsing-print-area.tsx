import { AlignmentType } from "docx";
import type { ParsedElementEdura } from "./common-comps/type-parsed";
import { base64ToUint8Array, parseImage, } from "~/export/docx/parser/img-parser";
import type { ImageNodeEdura } from "./common-comps/type-comp";
import parseKop from "./comp-word/parse-kop";
import * as htmlToImage from "html-to-image";


// import { parseTable } from "~/export/docx/parser/table-parser";
import parseCommonTable from "./comp-word/parse-table-full";
import parseTtd from "./comp-word/parse-ttd";
// import html2canvas from "html2canvas";
// import { resolveRgbaOrOklchToHex } from "~/lib/color-hack";

export default async function ParsingPrintArea(element:HTMLElement):Promise<ParsedElementEdura[]>{
    const resultParsed:ParsedElementEdura[]=[];
    
        async function walk(node: HTMLElement): Promise<void> {
            const tag = node.tagName;
            const style = window.getComputedStyle(node);

            // --- TABLE ---
            if (tag === "TABLE") {
                if(node.dataset.word === 'kop'){
                    const tabelNode = await parseKop(node as HTMLTableElement);
                    
                    resultParsed.push(tabelNode);
                    return;
                }
                if(node.dataset.word === 'ttd'){
                    const tabelNode = await parseTtd(node as HTMLTableElement);
                    /** tambahkan 2 paragrap */
                    resultParsed.push({
                        text: '',
                        type:'paragraph',
                        fontSize:12,
                        align:AlignmentType.CENTER,//typeof AlignmentType
                        marginTop:0,
                        marginBottom:0,
                        fontFamily:'Arial',
                        isUppercase:false,
                        isBold:false,
                        isItalic:false

                    });
                    resultParsed.push({
                        text: '',
                        type:'paragraph',
                        fontSize:12,
                        align:AlignmentType.CENTER,//typeof AlignmentType
                        marginTop:0,
                        marginBottom:0,
                        fontFamily:'Arial',
                        isUppercase:false,
                        isBold:false,
                        isItalic:false
                    });
                    resultParsed.push(tabelNode);
                    return;
                }
                const tableNode = await parseCommonTable(node as HTMLTableElement);
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
                    align:AlignmentType[style.textAlign.toUpperCase() as keyof typeof AlignmentType],
                    marginTop:parseFloat(style.marginTop),
                    marginBottom:parseFloat(style.marginBottom),
                    fontFamily:style.fontFamily,
                    isUppercase:style.textTransform ==='uppercase',
                    isItalic:style.fontStyle === 'italic',
                    isBold: style.fontSynthesis === 'weight' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700,
                });
                // return;
            }
            
            if(node.dataset.word === 'img'){
                const image =  await htmlToImage.toPng(node, {
                    cacheBust: true,
                    width: node.offsetWidth+20,
                    height: node.offsetHeight+20,
                    backgroundColor: "#ffffff",
                    });
                const dataParse = {
                    type:'image',
                    data: base64ToUint8Array(image.split(',')[1]),
                    mimeType:'image/png',
                    width:node.offsetWidth,
                    height:node.offsetHeight,
                    alignment:AlignmentType.CENTER
                }
                resultParsed.push(dataParse as ImageNodeEdura);
                    return;
            }
            // --- IMAGE (bukan di dalam TD) ---
            if (
                tag === "IMG" &&
                !node.closest("td")
            ) {
                
                if(node.dataset.word === 'image-liburan'){
                    const imageNode = await parseImage(node as HTMLImageElement);
                    resultParsed.push(imageNode as ImageNodeEdura);
                }
            }
    
            // --- WALK CHILDREN (async-safe) ---
            for (const child of Array.from(node.children)) {
                await walk(child as HTMLElement);
            }
        }
    
    await walk(element);
    return resultParsed;
}
