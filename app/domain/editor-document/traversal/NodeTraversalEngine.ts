import type { ContentNode } from "~/domain/editor/contents/base-node";
import type { EditorDocument } from "../EditorDocument";
import type { SelectionRange } from "../selection/SelectionRange";
import type { TraversalResult } from "./TraversalResult";
import { SelectionRangeNormalizer } from "../selection/SelectionRangeNormalizer";

export class NodeTraversalEngine {
    
    constructor(

        private normalizer =
            new SelectionRangeNormalizer()

    ) {}

    traverse( document: EditorDocument, range: SelectionRange ): TraversalResult {
        // const normalizedRange = this.normalizer.normalize( range );
        const normalizedRange = this.normalizer.normalize( document, range );
        const startIndex = document.children.findIndex( node => node.id === normalizedRange.anchor.nodeId );
        const endIndex = document.children.findIndex( node => node.id === normalizedRange.focus.nodeId );

        if ( startIndex === -1 || endIndex === -1 ) {
            return {
                fragment: { range:normalizedRange, nodes:[] }
            };
        }

        const from = Math.min( startIndex, endIndex );
        const to = Math.max( startIndex, endIndex );

        return { fragment: {
                    range: normalizedRange,
                    nodes:
                        document
                            .children
                            .slice(
                                from,
                                to + 1
                            )
                }
            };

    }

}