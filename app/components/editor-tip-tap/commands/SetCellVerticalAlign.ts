import { type Command } from "@tiptap/core";

import { updateSelectedCells } from "./updateSelectedCells";

export type VerticalAlign =
    | "top"
    | "middle"
    | "bottom";

export function SetCellVerticalAlign(
    value: VerticalAlign,
): Command {

    return updateSelectedCells(

        "tableCell",

        attrs => ({

            ...attrs,

            verticalAlign: value,

        }),

    );

}