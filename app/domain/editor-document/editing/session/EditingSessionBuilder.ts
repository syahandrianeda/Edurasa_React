import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { EditingSessionResult } from "./EditingSessionResult";

export class EditingSessionBuilder {

    build( document: QuestionBankDocument ): EditingSessionResult {

        return {
            session:{
                document,
                state:"idle",
                dirty:false,
                history:{
                        entries:[]
                    }
            },

            summary:{
                totalQuestions: document.questions.length,
                dirty:false,
                historyCount:0
            }
        };
    }
}