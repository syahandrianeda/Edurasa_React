import { QuestionFactory } from "~/domain/editor/engine/factories/question-factory";
import type { EditorContext } from "../../editor-context";
import type { CommandResult } from "../CommandResult";
import type { EditorCommand } from "../EditorCommand";

export class AddQuestionCommand implements EditorCommand {
    execute(
        context: EditorContext
    ): CommandResult {

        context.state.document.questions
            .push(
                QuestionFactory.create()
            );

        return {
            success: true,
            historyAware:true
        };

    }

}