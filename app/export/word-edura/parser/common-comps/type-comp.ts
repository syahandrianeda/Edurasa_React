
import type { ImageNodeExcel } from "~/export/excel/parser/parse-image-excel"

export type headingComp = {
    type: "heading"
    level: number,
    lineHeight:number,
    text: string,
    fontSize:number,
    align:string,//typeof AlignmentType
    marginTop:number,
    marginBottom:number,
    fontFamily:string,
    isUppercase:boolean,
    isItalic:boolean,
    isBold:boolean
}

export type TableKop = {
    type:'table-kop',
    width: number,
    rows:rowsTableKop[]
}
export type TableTtd = {
    type:'table-ttd',
    width: number,
    rows:rowsTableKop[]
}
export type TableCommon = {
    type:'table',
    width: number,
    rows:rowsTableKop[]
}
export type rowsTableKop={
    cells:childrenCellTableKop[]
}
export type childrenCellTableKop = {
    width:number,
    children:cellsTableKop[]
}
export type cellsTableKop=
    | ImageNodeEdura
    | ImageNodeExcel
    | paragraphEdura;


export type paragraphEdura={
    text: string,
    type:'paragraph',
    fontSize:number,
    align:string,//typeof AlignmentType
    marginTop:number,
    marginBottom:number,
    fontFamily:string,
    isUppercase:boolean,
    isBold:boolean,
    isItalic:boolean,
    isUnderline?:boolean
}
export interface ImageNodeEdura {
    type: "image";
    data: Uint8Array;
    mimeType: "image/png" | "image/jpeg";
    width: number;
    height: number;
    alignment: "left" | "center" | "right";
}