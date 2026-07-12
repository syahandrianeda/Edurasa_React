import type { Command } from "@tiptap/core";
import { findParentNodeClosestToPos } from "@tiptap/core";
import { CellSelection } from "@tiptap/pm/tables";

export function updateSelectedCells(
    nodeName: string,
    update: (
        attrs: Record<string, any>,
    ) => Record<string, any>,
): Command {

    return ({ state, tr, dispatch }) => {

        const selection = state.selection;

        /**
         * Multi cell selection.
         */
        if (selection instanceof CellSelection) {

            selection.forEachCell((cell, pos) => {

                tr.setNodeMarkup(

                    pos,

                    undefined,

                    update(cell.attrs),

                );

            });

            dispatch?.(tr);

            return true;

        }

        /**
         * Cursor berada di dalam satu cell.
         */
        const parentCell =
            findParentNodeClosestToPos(
                selection.$from,
                node => node.type.name === nodeName,
            );

        if (!parentCell) {

            return false;

        }

        tr.setNodeMarkup(

            parentCell.pos,

            undefined,

            update(parentCell.node.attrs),

        );

        dispatch?.(tr);

        return true;

    };

}