import type { Mark } from "./mark-node";

export interface TextNode {

    type: "text";

    text: string;

    marks?: Mark[];
}