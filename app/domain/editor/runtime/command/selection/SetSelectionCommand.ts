// import type { EditorCommand }
// from "../EditorCommand";

import type { SelectionState } from "~/domain/editor-document/selection/SelectionState";
import type { EditorCommand } from "../EditorCommand";
import type { EditorContext } from "../../editor-context";
import type { CommandResult } from "../CommandResult";

// import type { EditorContext }
// from "../../editor-context";

// import type { CommandResult }
// from "../CommandResult";

// import type { SelectionState }
// from "~/domain/editor-document/selection/SelectionState";

export class SetSelectionCommand
implements EditorCommand {

    constructor(

        private selection: SelectionState

    ) {}

    execute(
        context:
            EditorContext
    ): CommandResult {

        context.state.selection =
            this.selection;

        return {

            success: true,

            historyAware: true

        };

    }

}