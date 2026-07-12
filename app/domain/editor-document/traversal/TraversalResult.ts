import type { ContentNode }
from "~/domain/editor/contents/base-node";
import type { SelectionFragment } from "../resolver/SelectionFragment";

export interface TraversalResult {

    // nodes: ContentNode[];
    fragment: SelectionFragment;
}