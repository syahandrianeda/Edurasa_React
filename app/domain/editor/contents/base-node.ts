import type { EquationNode } from "./equation-node";
import type { ImageNode } from "./image-node";
import type { ListNode } from "./list-node";
import type { NumberListNode } from "./number-list-node";
import type { ParagraphNode } from "./paragraph-node";
import type { TableNode } from "./table-node";

export interface BaseNode {

    id: string;

    type: string;
}
export type ContentNode =
    | ParagraphNode
    | ImageNode
    | TableNode
    | EquationNode
    | ListNode
    | NumberListNode;