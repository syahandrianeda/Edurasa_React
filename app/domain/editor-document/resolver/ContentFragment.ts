import type { ContentNode }
from "~/domain/editor/contents/base-node";
import type { InlineNode } from "~/domain/editor/inlines/inline-node";

export interface ContentFragment {

    nodes:
        ContentNode[];
    inlines:
        InlineNode[];

}