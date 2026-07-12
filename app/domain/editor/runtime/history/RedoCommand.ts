import type { CommandResult } from "../command/CommandResult";
import type { EditorCommand } from "../command/EditorCommand";
import type { EditorContext } from "../editor-context";
import { HistoryManager } from "./HistoryManager";

export class RedoCommand implements EditorCommand {
    execute(
        context:
            EditorContext
    ): CommandResult {

        const history = new HistoryManager( context.state.history );

        const document =
            history.redo(
                context.state.document
            );

        if (!document) {

            return {
                success:false,
                message:
                    "Nothing to redo"
            };

        }

        context.state.document =
            document;

        return {
            success:true,
            historyAware:false
        };

    }

}