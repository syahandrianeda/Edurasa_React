import type { ReactNode } from "react";

export type FormatElemen = 'table'|'square'|'horizontal'|'vertical';


export interface PgTunggal {
    /** opsiPilihanJawabanBiasa */
    OpsiPilihanJawaban:OpsiPilihanJawaban[],
    formatOpsi:FormatElemen,
    opsiPilihanTabel?:OpsiPilihanTabel[],
    // type: 'radio',
    valid?:number
}
export interface OpsiPilihanTabel{
    row:number,
    content:RowOpsiJawaban[]
}
export interface RowOpsiJawaban{
    col:number
    content:string
}
export interface PgKompleks {
    OpsiPilihanJawaban:OpsiPilihanJawaban[],
    formatOpsi:FormatElemen,
    tableHeader?:OpsiPilihanJawabanTable
    // type:'checkbox',
    valid?:number[]
}
export interface OpsiPilihanJawaban{
    // label:string|ReactNode
    // value:string|number
    content:string
    index:number
    // tableFormat?:OpsiPilihanJawabanTable[]
}

export interface OpsiPilihanJawabanTable{
    type:'heading'|'cell',
    content:string//ReactNode
}
export interface PilihanMenjodohkan{
    opsiKiri:OpsiPilihanJawaban[],
    opsiKanan:OpsiPilihanJawaban[],
}
export interface PilihanBenarSalahType{
    listPernyataan:OpsiPilihanJawaban[],
    formatTampilan:FormatElemen,
}
export interface JumlahBarisMenulisRapih{
    listPernyataan:OpsiPilihanJawaban[],
    formatTampilan:FormatElemen,
}
export interface ListBentukSoalType{
    name:string,
    description:string,
    way_correction:'auto'|'manual'|'semi-auto';
    

}