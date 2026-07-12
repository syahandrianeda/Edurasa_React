import type { EditorContext } from "../../editor-context";
import type { CommandResult } from "../CommandResult";
import type { EditorCommand } from "../EditorCommand";

export class SetEditorModeCommand implements EditorCommand {
    constructor(
        private mode:
            EditorMode
    ) {}

    execute(
        context: EditorContext
    ): CommandResult {

        context.state.mode =
            this.mode;

        return {
            success:true,
            historyAware:false
        };

    }

}