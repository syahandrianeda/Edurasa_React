import type { EditorCommand }
from "../EditorCommand";

import type { EditorContext }
from "../../editor-context";

import type { CommandResult }
from "../CommandResult";

import type { SelectionPoint }
from "~/domain/editor-document/selection/SelectionPoint";

import {
    SelectionService
}
from "~/domain/editor-document/selection/SelectionService";

export class CollapseSelectionCommand
implements EditorCommand {

    constructor(

        private point:
            SelectionPoint,

        private selectionService =
            new SelectionService()

    ) {}

    execute(
        context:
            EditorContext
    ): CommandResult {

        context.state.selection =
            this.selectionService
                .collapse(
                    this.point
                );

        return {

            success: true,

            historyAware: true

        };

    }

}