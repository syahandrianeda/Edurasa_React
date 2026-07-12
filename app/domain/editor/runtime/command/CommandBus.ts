import type { EditorContext } from "../editor-context";
import { HistoryManager } from "../history/HistoryManager";
import type { CommandResult } from "./CommandResult";
import type { EditorCommand } from "./EditorCommand";

export class CommandBus {

    // constructor(
    //     private context: EditorContext
    // ) {}

    // execute(
    //     command: EditorCommand
    // ): CommandResult {

    //     return command.execute(
    //         this.context
    //     );

    // }

    private historyManager: HistoryManager;

    constructor(
        private context:
            EditorContext
    ) {

        this.historyManager = new HistoryManager( context.state.history );

    }

    execute(
        command:
            EditorCommand
    ): CommandResult {

        const before =
            structuredClone(
                this.context
                    .state
                    .document
            );

        const result =
            command.execute(
                this.context
            );

        if (
            result.success &&
            result.historyAware
        ) {

            this.historyManager
                .push(before);

        }

        return result;

    }
    

}