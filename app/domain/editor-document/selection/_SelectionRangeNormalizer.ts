import type { SelectionRange }
from "./SelectionRange";

export class SelectionRangeNormalizer {

    normalize(
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

            &&

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

}