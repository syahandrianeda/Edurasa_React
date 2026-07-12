import type { BaseNode, ContentNode } from "./base-node";

export interface TableNode extends BaseNode {

    type: "table";

    rows: TableRow[];
}
export interface TableRow {

    cells: TableCell[];
}
export interface TableCell {

    children: ContentNode[];
}