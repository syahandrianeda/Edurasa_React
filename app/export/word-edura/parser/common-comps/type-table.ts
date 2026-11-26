import type { ImageNodeExcel } from "~/export/excel/parser/parse-image-excel"
import type { headingComp, ImageNodeEdura, paragraphEdura, TableKop, TableTtd } from "./type-comp"
import type { OklchColorResult, RgbColorResult } from "~/lib/color-hack"

/** format penomoran list yang dikenali dari tailwind / computed style */
export type ListFormat =
    | 'decimal'
    | 'upper-alpha'
    | 'lower-alpha'
    | 'upper-roman'
    | 'lower-roman'
    | 'bullet'

/** metadata satu instance list (satu reference = satu penomoran Word) */
export type ListInfo = {
    format: ListFormat,
    start: number,
    reference: string,
    indentLeft: number, // twip
    hanging: number,    // twip
    markerBold: boolean
}

export type listItemEdura = {
    spacingBefore: number, // px
    spacingAfter: number,  // px
    blocks: ListBlockEdura[]
}

export type listNodeEdura = {
    type: 'list',
    info: ListInfo,
    items: listItemEdura[]
}

export type ListBlockEdura =
    | paragraphEdura
    | headingComp
    | ImageNodeEdura
    | TableKop
    | TableTtd
    | TableParseCommon
    | listNodeEdura

export type TableParseCommon = {
    type:'table',
    width: number,
    rows:rowsTableCommon[]
}
export type rowsTableCommon={
    cells:childrenCellTableCommon[]
}
export type childrenCellTableCommon = {
    width:number,
    shading?:shadingTypeCommon,
    margins?:MarginTypeCommon,
    padding?:MarginTypeCommon,
    verticalAlign?:'top'|'center'|'bottom'|'middle',
    parentType:'td'|'th',
    colSpan:number,
    rowSpan:number,
    borders:BorderTypeCommon,
    children:cellsTableCommon[],
    typeData?:'string'|'number'|'date'|'boolean'
} 
export type BorderTypeCommon = {
    top:BorderSideCommon,
    right:BorderSideCommon,
    bottom:BorderSideCommon,
    left:BorderSideCommon   
}
export type BorderSideCommon = {
    color:string,
    size:number,
    style:string //BorderStyle
}
export type MarginTypeCommon = {
        top:number,
        right:number,
        bottom:number,
        left:number
    }
export type shadingTypeCommon = {
    bg:string,
    persentage?:number,
    color:string,
    detailBg?:OklchColorResult|RgbColorResult,
    detailColor?:OklchColorResult|RgbColorResult
}
export type CellContentTypeNode={
    type:'text',
    value:string,
    fontSize:number,
    align:string,//typeof AlignmentType
    marginTop:number,
    marginBottom:number,
    fontFamily:string,
    isUppercase:boolean,
    isBold:boolean,
    isItalic:boolean
}
export type cellsTableCommon=
    | ImageNodeEdura
    | paragraphEdura
    | CellContentTypeNode  
    | ImageNodeExcel
    | listNodeEdura
    | headingComp
    | TableParseCommon
    | TableKop
    | TableTtd
    ;
