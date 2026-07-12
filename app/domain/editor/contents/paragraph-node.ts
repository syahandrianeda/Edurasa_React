import type { InlineNode } from "../inlines/inline-node";
import type { BaseNode } from "./base-node";

export interface ParagraphNode extends BaseNode {

    type: "paragraph";

    children: InlineNode[];
}