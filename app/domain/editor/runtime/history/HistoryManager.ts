import type { EditorDocument } from "~/domain/editor-document/EditorDocument";
import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { HistoryState } from "./HistoryState";

export class HistoryManager {

    constructor(
        private history:
            HistoryState
    ) {}

    push(
        document:
            // QuestionBankDocument
            EditorDocument
    ): void {

        this.history.undoStack.push({

            timestamp:
                Date.now(),

            document:
                structuredClone(
                    document
                )

        });

        this.history.redoStack =
            [];

    }

    canUndo():boolean {

        return (
            this.history.undoStack
                .length > 0
        );

    }

    canRedo():boolean {

        return (
            this.history.redoStack
                .length > 0
        );

    }

    undo(
        current:
            QuestionBankDocument
    ):
        QuestionBankDocument
        | null
    {

        const snapshot =
            this.history.undoStack
                .pop();

        if (!snapshot) {

            return null;

        }

        this.history.redoStack.push({

            timestamp:
                Date.now(),

            document:
                structuredClone(
                    current
                )

        });

        return structuredClone(
            snapshot.document
        );

    }

    redo(
        current:
            // QuestionBankDocument
            EditorDocument
    ):
        QuestionBankDocument
        | null
    {

        const snapshot =
            this.history.redoStack
                .pop();

        if (!snapshot) {

            return null;

        }

        this.history.undoStack.push({

            timestamp:
                Date.now(),

            document:
                structuredClone(
                    current
                )

        });

        return structuredClone(
            snapshot.document
        );

    }

}