import type { EditorCommand }
from "../EditorCommand";

import type { EditorContext }
from "../../editor-context";

import type { CommandResult }
from "../CommandResult";

export class ClearSelectionCommand
implements EditorCommand {

    execute(
        context:
            EditorContext
    ): CommandResult {

        context.state.selection =
            null;

        return {

            success: true,

            historyAware: true

        };

    }

}