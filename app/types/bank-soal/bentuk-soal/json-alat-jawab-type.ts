import type { FormatElemen } from "../bentuk-soal-type"

export interface JsonAlatJawab  {
    OpsiPilihanJawaban: OpsiPilihanJawabanType[],
    formatOpsi: FormatElemen
    valid?:number|number[]|number[][]
    OpsiPilihanJawabanTable?:OpsiPilihanJawabanTableType[]
}
export interface OpsiPilihanJawabanType{
    // label:string|ReactNode
    // value:string|number
    content:string
    index:number
    // tableFormat?:OpsiPilihanJawabanTable[]
}


export interface OpsiPilihanJawabanTableType{
    type:'heading'|'cell',
    content:string//ReactNode
    /** index adalah indexRow dalam table */
    index:number 
    indexCell:number
}