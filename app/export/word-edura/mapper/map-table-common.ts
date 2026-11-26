import { AlignmentType, BorderStyle, Paragraph, Table, TableBorders, TableCell, TableLayoutType, TableRow, TextRun, WidthType, type IBorderOptions } from "docx";
import type { BorderSideCommon, cellsTableCommon, childrenCellTableCommon, rowsTableCommon, TableParseCommon } from "../parser/common-comps/type-table";
import { resolveRgbaOrOklchToHex } from "~/lib/color-hack";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import MapImageCell from "./map-image-in-cell";
import AlignMapper from "./alignment-docx";
import VerticalAlignMapper from "./verticalalignment-docx";
import MapListEdura from "./map-list";
import MapParagraphEdura from "./map-paragraph";
import MapHeadingDocx from "./map-heading";
import MapKopSurat from "./map-kop";
import MapTtd from "./map-kttd";

/**
 * Border sel mengikuti computed style komponen sumber.
 * Sisi yang tidak punya border (width 0 / none / hidden) ditulis eksplisit
 * sebagai `nil` supaya Word tidak memakai border bawaan tabel.
 */
function borderColor(color?: string) {
    const hex = color ? resolveRgbaOrOklchToHex(color)?.hex : undefined;
    return hex ? hex.replace('#', '').slice(0, 6).toUpperCase() : '000000';
}

function borderStyle(style?: string) {
    switch (style) {
        case 'dashed': return BorderStyle.DASHED;
        case 'dotted': return BorderStyle.DOTTED;
        case 'double': return BorderStyle.DOUBLE;
        default: return BorderStyle.SINGLE;
    }
}

function mapBorderSide(side?: BorderSideCommon): IBorderOptions {
    const width = side?.size ?? 0;
    const style = side?.style ?? 'none';

    if (!side || !Number.isFinite(width) || width <= 0 || style === 'none' || style === 'hidden') {
        return { style: BorderStyle.NIL, size: 0 };
    }

    return {
        style: borderStyle(style),
        // 1px di layar setara 1/8 pt di Word (dibatasi agar tetap wajar)
        size: Math.min(96, Math.max(2, Math.round(width * 6))),
        color: borderColor(side.color),
    };
}

export default function MapTableCommon(parse:TableParseCommon){
    return new Table({
        borders: TableBorders.NONE,
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
                                alignment:AlignmentType.START,
                                children:[
                                    MapImageCell(m) 
                                ]
                            });
                            konten.push(pImg)
                        }
                        if(m.type === 'list'){
                            konten.push(...MapListEdura(m))
                        }
                        if(m.type === 'heading'){
                            konten.push(MapHeadingDocx(m))
                        }
                        if(m.type === 'table'){
                            konten.push(MapTableCommon(m))
                        }
                        if(m.type === 'table-kop'){
                            konten.push(MapKopSurat(m))
                        }
                        if(m.type === 'table-ttd'){
                            konten.push(MapTtd(m))
                        }
                        if(m.type === 'paragraph'){
                            konten.push(MapParagraphEdura(m))
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
                        borders:{
                            top: mapBorderSide(m.borders?.top),
                            right: mapBorderSide(m.borders?.right),
                            bottom: mapBorderSide(m.borders?.bottom),
                            left: mapBorderSide(m.borders?.left),
                        },
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