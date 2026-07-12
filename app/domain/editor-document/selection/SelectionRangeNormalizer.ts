import type { EditorDocument }
from "../EditorDocument";

import type { SelectionRange }
from "./SelectionRange";

import { DocumentOrderComparer }
from "../navigation/DocumentOrderComparer";

export class SelectionRangeNormalizer {

    constructor(

        private comparer =
            new DocumentOrderComparer()

    ) {}

    normalize(

        document:
            EditorDocument,

        range:
            SelectionRange

    ): SelectionRange {

        const anchor =
            range.anchor;

        const focus =
            range.focus;

        if (

            anchor.nodeId ===
            focus.nodeId

        ) {

            if (

                anchor.offset >
                focus.offset

            ) {

                return {

                    anchor: focus,

                    focus: anchor

                };

            }

            return range;

        }

        const anchorBeforeFocus =

            this.comparer
                .isBefore(

                    document,

                    anchor.nodeId,

                    focus.nodeId

                );

        if (
            anchorBeforeFocus
        ) {

            return range;

        }

        return {

            anchor: focus,

            focus: anchor

        };

    }

}