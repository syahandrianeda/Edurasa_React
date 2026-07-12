import type { EditorDocument } from "~/domain/editor-document/EditorDocument";
import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { EditorState } from "../../runtime/editor-state";
import { HistoryFactory } from "../../runtime/history/HistoryFactory";

export class EditorStateFactory {

    static create(
        // document: QuestionBankDocument
        document: EditorDocument
    ): EditorState {

        return {

            document,

            mode: "teacher",

            selection: null,

            clipboard: null,

            history: HistoryFactory.create()
        };

    }

}