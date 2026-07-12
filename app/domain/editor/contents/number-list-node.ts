import type { BaseNode } from "./base-node";
import type { ParagraphNode } from "./paragraph-node";

export interface NumberListNode extends BaseNode {

    type: "number-list";

    items: ParagraphNode[];
}