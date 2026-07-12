
import type { SelectionPoint } from "./SelectionPoint";
import type { SelectionState } from "./SelectionState";

export class SelectionService {

    isCollapsed(
        selection: SelectionState
    ): boolean {

        const {
            anchor,
            focus
        } = selection.range;

        return (
            anchor.nodeId ===
            focus.nodeId
        )
        &&
        (
            anchor.offset ===
            focus.offset
        );

    }

    collapse(
        point:
            SelectionPoint
    ): SelectionState {

        return {

            range: {

                anchor: point,

                focus: point

            }

        };

    }

    isSameNode(
        selection:
            SelectionState
    ): boolean {

        const {
            anchor,
            focus
        } = selection.range;

        return (
            anchor.nodeId ===
            focus.nodeId
        );

    }

    createRange(
        anchor:
            SelectionPoint,

        focus:
            SelectionPoint
    ): SelectionState {

        return {

            range: {

                anchor,

                focus

            }

        };

    }

    getAnchor(
        selection:
            SelectionState
    ): SelectionPoint {

        return selection
            .range
            .anchor;

    }

    getFocus(
        selection:
            SelectionState
    ): SelectionPoint {

        return selection
            .range
            .focus;

    }

}