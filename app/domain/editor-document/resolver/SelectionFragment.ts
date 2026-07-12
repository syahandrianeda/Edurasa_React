import type { ContentNode } from "~/domain/editor/contents/base-node";
import type { SelectionRange } from "../selection/SelectionRange";

export interface SelectionFragment {

    range: SelectionRange;

    nodes: ContentNode[];

}