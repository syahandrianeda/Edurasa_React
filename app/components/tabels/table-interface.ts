import type { ReactNode } from "react";
import type { HeaderWidth } from "../resizable/interface-resizable";
export type SortOrder = 'asc' | 'desc';

export interface ThType<T>{
    label: string;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
    key?: keyof T 
    sortable?: boolean 
    labelDefault?:string
    sortResolver?: (row: T) => string | number
    width?:HeaderWidth,
    type?:ColumnRenderType
}

export interface HeadingTableType<T>{
    columns: ThType<T>[]
}
export type ColumnRenderType = 'index' |'actions'|'field';

export interface KeyModelTable<T>{
    type: ColumnRenderType
    render?: (row:T)=>ReactNode
    className?: string 
    id?:string
    index?:number
    key?: keyof T
}

export type SortState<T> = {
    key: keyof T
    order: SortOrder  
    resolver?: (row: T) => string | number
}[];