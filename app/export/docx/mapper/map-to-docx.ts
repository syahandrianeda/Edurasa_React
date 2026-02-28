import {
    Document,
    Paragraph,
    Table,
    TableRow,
    TableCell,
    WidthType,
    TableLayoutType,
    AlignmentType,
    TextRun,
    HeadingLevel,
    ImageRun,
    HorizontalPositionRelativeFrom,
    VerticalPositionRelativeFrom,
    VerticalAlign,
    type IParagraphOptions,
    type ParagraphChild,
    convertMillimetersToTwip
} from "docx"
import { pxToTwip } from "../converter/px-to-twip"
import { parseHeading } from "../parser/heading-parser"
// import { loadImageAsArrayBuffer, mapImageToDocx } from "../parser/img-parser"
import { mapTableToDocx } from "./map-table-dox"
import type { ParagraphParseNode, TableCellContent } from "../parser/node-parser-type"
import type { ImageNode } from "../parser/img-parser"
import { AlignCenter } from "lucide-react"


function rgbToHex(rgb: string) {
  const result = rgb.match(/\d+/g)
  if (!result) return "FFFFFF"

  return result
    .slice(0, 3)
    .map(x => Number(x).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()
}


export async function mapToDocx(parsed: any[], type:'portrait'|'landscape') {
    
    const children = parsed.map(node => {
        if (node.type === "table") {
            return new Table({
                width: {
                    size: pxToTwip(node.width),
                    type: WidthType.DXA
                    },
                layout: TableLayoutType.FIXED,
                
                rows: node.rows.map((row: any) =>{
                        
                    return new TableRow({
                        
                        children: row.cells.map((cell: any) =>{
                            // console.log('cell children', Array.isArray(cell.children), cell.children.length, cell.children)
                            const dataChildren: ParagraphChild[] = []
                            cell.children.forEach((element:TableCellContent) => {
                                
                                if(element.type === 'image'){
                                    // console.log('imgData', element.data)
                                    const imeg = new ImageRun({
                                        type:'png',
                                        data: new Uint8Array(element.data),
                                        transformation:{
                                            width:element.width,
                                            height:element.height
                                        }
                                    })
                                    dataChildren.push(imeg);
                                }
                                if(element.type === 'text'){
                                    const instanceText = new TextRun({
                                        text: element.value,
                                    })
                                    dataChildren.push(instanceText)    
                                }
                                if(element.type === 'paragraph'){
                                    const instanceText = new TextRun({
                                        text: element.text,
                                        size:'12pt',
                                        break:1,
                                        bold:true,
                                        
                                    })
                                    dataChildren.push(instanceText) 
                                }
                            });
                            
                            return new TableCell({
                                    columnSpan: cell.colSpan,
                                    rowSpan: cell.rowSpan,
                                    width: {
                                        size: pxToTwip(cell.width),
                                        type: WidthType.DXA,
                                        
                                    },
                                    // noWrap:cell.noWrap,
                                    verticalAlign:VerticalAlign.CENTER,
                                    
                                    shading: cell.backgroundColor
                                        // ? { fill: rgbToHex(cell.backgroundColor) }
                                        ? { fill: cell.backgroundColor }
                                        : undefined,
                                    margins: {
                                        top: pxToTwip(cell.padding?.top ?? 0),
                                        bottom: pxToTwip(cell.padding?.bottom ?? 0),
                                        left: pxToTwip(cell.padding?.left ?? 0),
                                        right: pxToTwip(cell.padding?.right ?? 0),
                                    },
                                    children:[
                                        new Paragraph({
                                            children:dataChildren,
                                            alignment:cell.align
                                        })
                                    ]
                                })
                            }
                        )
                    })
                }
                )
            })
        }
        if(node.type === 'heading'){
                return parseHeading(node);
            }
            
        
        return new Paragraph('');
    })
    const dimenstion = type === 'portrait'? {
                width: convertMillimetersToTwip(210),//11906,
                height: convertMillimetersToTwip(297)//16838
    }:
    {
                width: convertMillimetersToTwip(297),// 16838,
                height:convertMillimetersToTwip(210)//11906,
    }
    return new Document({
        sections: [
        {
            properties: {
            page: {
                size: {
                ...dimenstion
                },
                margin: {
                top: convertMillimetersToTwip(10),//1000,
                bottom: convertMillimetersToTwip(10),//1000,
                left: convertMillimetersToTwip(10),// 1000,
                right: convertMillimetersToTwip(10),//1000
                }
            }
            },
            
            children
        }
        ]
    })
}
