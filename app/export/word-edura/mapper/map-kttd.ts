import { AlignmentType, Paragraph, Table, TableCell, TableLayoutType, TableRow, TextRun, WidthType } from "docx";
import type { cellsTableKop, childrenCellTableKop, rowsTableKop, TableTtd } from "../parser/common-comps/type-comp";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import MapImageCell from "./map-image-in-cell";

export default function MapTtd(node:TableTtd){
    return  new Table({
        width: {
            size: '100%',//Math.min(pxToTwip(node.width),pxToTwip(710)),
            type: WidthType.DXA
            },
        layout: TableLayoutType.FIXED,
        margins:{
            bottom:pxToTwip(15),
        },
        rows: node.rows.map((row:rowsTableKop) =>{
            
            return new TableRow({
                children:row.cells.map((cell:childrenCellTableKop) =>{
                    const konten:Paragraph|Table[]=[];
                
                    cell.children.forEach((m:cellsTableKop)=>{
                        if(m.type === 'image'){
                            const pImg = new Paragraph({
                                alignment:AlignmentType.CENTER,
                                children:[
                                    MapImageCell(m) 
                                ]
                            });
                            konten.push(pImg)
                        }
                        if(m.type === 'paragraph'){
                            const pPrgp = new Paragraph({
                                alignment:AlignmentType.CENTER,
                                children:[
                                    new TextRun({
                                        text:m.text,
                                        bold:m.isBold,
                                        italics:m.isItalic,
                                        size:m.fontSize,
                                        allCaps:m.isUppercase,
                                        font:m.fontFamily,
                                        underline:m.isUnderline?{}:undefined
                                    })
                                ]
                            });
                            konten.push(pPrgp)
                        }
                    });

                    return new TableCell({
                        borders:{
                            left:{
                                style:'nil',
                                size:0
                            },
                            right:{
                                style:'nil',
                                size:0
                            },
                            top:{
                                style:'nil',
                                size:0
                            },
                            bottom:{
                                style:'nil',
                                size:0
                            },
                        },
                        width:{
                            size:pxToTwip(cell.width),
                            type: WidthType.DXA
                        },
                        children: konten//[...konten]
                        
                    })
                })
            })
        })
    })
}