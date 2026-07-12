import type { BaseNode } from "./base-node";
import type { ParagraphNode } from "./paragraph-node";

export interface ListNode extends BaseNode {

    type: "list";

    items: ParagraphNode[];
}