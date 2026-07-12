// domain/editor-document/selection/SelectionQueryService.ts
import type { SelectionState }
from "./SelectionState";

export class SelectionQueryService {

    isCollapsed(
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
        )
        &&
        (
            anchor.offset ===
            focus.offset
        );

    }

    isSingleNode(
        selection:
            SelectionState
    ): boolean {

        return (

            selection
                .range
                .anchor
                .nodeId

            ===

            selection
                .range
                .focus
                .nodeId

        );

    }

    getSelectedLength(
        selection:
            SelectionState
    ): number {

        if (
            !this.isSingleNode(
                selection
            )
        ) {

            return 0;

        }

        return Math.abs(

            selection
                .range
                .focus
                .offset

            -

            selection
                .range
                .anchor
                .offset

        );

    }

    getSelectedNodeIds(
        selection:
            SelectionState
    ): string[] {

        const ids =
            new Set<string>();

        ids.add(
            selection
                .range
                .anchor
                .nodeId
        );

        ids.add(
            selection
                .range
                .focus
                .nodeId
        );

        return [
            ...ids
        ];

    }

}