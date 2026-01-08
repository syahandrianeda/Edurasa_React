import type { ReactNode } from "react"

export interface ttdKontenType{
    type:string,
    label: string,
    forRole:string[],
    description?:ReactNode
    column?: number,
    dataColumns?:dataColum[]
}
export interface dataColum{
    side:'left'|'middle'|'right',
    typePerson:string,
    contentTop: ReactNode,
    countBreak: number,
    contentBottom: ReactNode
}
