import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionEditOperation } from "./QuestionEditOperation";
import type { QuestionEditResult } from "./QuestionEditResult";
import { EditingSessionProcessor } from "./session/EditingSessionProcessor";
import type { QuestionEditingSession } from "./session/QuestionEditingSession";

export class QuestionEditor {
    constructor( 
        private processor = new EditingSessionProcessor()
    ){}

    edit(
        session: QuestionEditingSession,
        operation: QuestionEditOperation
    ): QuestionEditResult {

        const result = this.processor.process( session, operation.command );

        return {
            success: result.success,
            document: result.session?.document,
            message: result.message
        };

    }

}