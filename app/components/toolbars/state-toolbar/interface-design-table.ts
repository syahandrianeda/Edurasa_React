import type { ReactNode } from "react";
import type { ColumnRenderType } from "~/components/tabels/table-interface";

/** 
 * ==== digunakan untuk ThType di key: column 
 * 
label: string;
className?: string;
colSpan?: number;
rowSpan?: number;
key?: keyof T 
sortable?: boolean
sortResolver?: (row: T) => string | number
*/
/** Digunakan untuk menggenarate HeadingTableType<T>*/
export type OptionDesignTableToolbar<T> = {
    labelDefault: string,
    labelCustom?: string
    classNamesHeader?: string[],
    classNamesColumn?: string[],
    colSpan?: number;
    rowSpan?: number;
    key?: keyof T;
    canSortable?:boolean
    resolverNode?:(row:T)=>ReactNode
    resolverSort?:(row:T) =>string|number
    type: ColumnRenderType
    
}

export function SetDesignHeaderColumn(){

}
export function SetDesignKeyColumn(){
    
}