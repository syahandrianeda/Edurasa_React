import type { EntityNode } from "./entities-node";
import type { TextNode } from "./text-node";

export type InlineNode =
    | TextNode
    | EntityNode;