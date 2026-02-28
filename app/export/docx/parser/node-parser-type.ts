import type { ImageNode } from "./img-parser";

export type ParsedNode =
    | {
        type: "heading"
        level: number
        text: string,
        classList:string[]
        }
    | ParagraphParseNode
    | parseTableNode
    | ImageNode
    // | Promise<ImageNode | null>;
export type parseTableNode ={
        type: "table"
        rows: ParsedRow[]
        }
export type ParagraphParseNode = {
    
        type: "paragraph"
        text: string
        classList:string[]
        }

export type ParsedRow = {
    // cells: ParsedCell[]
    cells: ParsedCell[]
}

export type ParsedCell = {
    text: string
    colSpan?: number
    rowSpan?: number
    backgroundColor?: string
    align:string,
    noWrap?: boolean
    padding?: {
        top: number
        right: number
        bottom: number
        left: number
    }
    border:string,
    children:TableCellContent[];
}

export type TableCellContent =
  | { type: "text"; value: string }
  | ParagraphParseNode
  | ImageNode//{ type: "image"; src: string; width: number; height: number };

export interface ParsedTableCell {
    contents: TableCellContent[];
    width: number;
    colSpan?: number;
    rowSpan?: number;
    backgroundColor: string;
    textAlign: string;
    padding: string;
    bold: boolean;
    border: string;
}
