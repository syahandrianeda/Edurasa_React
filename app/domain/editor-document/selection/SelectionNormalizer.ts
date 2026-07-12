import type { SelectionState }
from "./SelectionState";

import type { SelectionOrder }
from "./SelectionOrder";

export class SelectionNormalizer {

    constructor(

        private order:
            SelectionOrder

    ) {}

    normalize(
        selection:
            SelectionState
    ): SelectionState {

        const {
            anchor,
            focus
        } = selection.range;

        const comparison =
            this.order.compare(

                anchor.nodeId,

                focus.nodeId

            );

        if (
            comparison < 0
        ) {

            return selection;

        }

        if (
            comparison > 0
        ) {

            return {

                range: {

                    anchor: focus,

                    focus: anchor

                }

            };

        }

        if (
            anchor.offset <=
            focus.offset
        ) {

            return selection;

        }

        return {

            range: {

                anchor: focus,

                focus: anchor

            }

        };

    }

}