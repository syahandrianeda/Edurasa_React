import type { CommandResult } from "../command/CommandResult";
import type { EditorCommand } from "../command/EditorCommand";
import type { EditorContext } from "../editor-context";
import { HistoryManager } from "./HistoryManager";

export class UndoCommand implements EditorCommand {
    execute(
        context:
            EditorContext
    ): CommandResult {

        const history = new HistoryManager( context.state.history );

        const document =
            history.undo(
                context.state.document
            );

        if (!document) {

            return {
                success:false,
                message:
                    "Nothing to undo"
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