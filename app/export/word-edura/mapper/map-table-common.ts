import { AlignmentType,  Paragraph, Table, TableCell, TableLayoutType, TableRow, TextRun, WidthType } from "docx";
import type { cellsTableCommon, childrenCellTableCommon, rowsTableCommon, TableParseCommon } from "../parser/common-comps/type-table";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import MapImageCell from "./map-image-in-cell";
import AlignMapper from "./alignment-docx";
import VerticalAlignMapper from "./verticalalignment-docx";

export default function MapTableCommon(parse:TableParseCommon){
    return new Table({
        width: {
            size: '100%',//Math.min(pxToTwip(parse.width),pxToTwip(710)),
            type: WidthType.DXA
            },
        layout: TableLayoutType.FIXED,
        // margins:{
        //     bottom:pxToTwip(15),
        // },
        
        rows: parse.rows.map((row:rowsTableCommon) =>{
            return new TableRow({
                tableHeader: row.cells.some(cell=>cell.parentType==='th'),
                children:row.cells.map((m:childrenCellTableCommon) =>{
                    const konten:Paragraph|Table[]=[];
                
                    m.children.forEach((m:cellsTableCommon)=>{
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
                                alignment:AlignMapper(m.align),
                                
                                children:[
                                    new TextRun({
                                        text:m.text,
                                        bold:m.isBold,
                                        italics:m.isItalic,
                                        size:m.fontSize,
                                        allCaps:m.isUppercase,
                                        font:m.fontFamily,
                                    })
                                ]
                            });
                            konten.push(pPrgp)
                        }
                        if(m.type === 'text'){
                            const pPrgp = new Paragraph({
                                alignment:AlignMapper(m.align),
                                children:[
                                    new TextRun({
                                        text:m.value,
                                        bold:m.isBold,
                                        italics:m.isItalic,
                                        size:m.fontSize,
                                        allCaps:m.isUppercase,
                                        font:m.fontFamily,
                                    })
                                ]
                            });
                            konten.push(pPrgp)
                        }
                    });

                    return new TableCell({
                        borders:{},
                        rowSpan:m.rowSpan,
                        columnSpan:m.colSpan,
                        width:{
                            size:pxToTwip(m.width),
                            type: WidthType.DXA
                        },
                        
                        shading:{
                            fill:m.shading?.bg==='000000'?'FFFFFF':m.shading?.bg,
                            color:m.shading?.color ?? 'auto',
                            // type:cell.shading?.persentage===1?'solid':'clear'    
                        },
                        verticalAlign:VerticalAlignMapper(m.verticalAlign??'center'),
                        margins: {
                            top: pxToTwip(m.padding?.top ?? 0),
                            bottom: pxToTwip(m.padding?.bottom ?? 0),
                            left: pxToTwip(m.padding?.left ?? 0),
                            right: pxToTwip(m.padding?.right ?? 0),
                        },
                        
                        children: konten//[...konten]
                        
                    })
                })
            })
        })
    })
}