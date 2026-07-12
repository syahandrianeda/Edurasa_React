import type { EditorContext } from "../../editor-context";
import type { CommandResult } from "../CommandResult";
import type { EditorCommand } from "../EditorCommand";

export class RemoveQuestionCommand implements EditorCommand {
    constructor(
        private index:number
    ) {}

    execute(
        context: EditorContext
    ): CommandResult {

        context.state.document.questions
            .splice(
                this.index,
                1
            );

        return {
            success:true,
            historyAware:true
        };

    }

}