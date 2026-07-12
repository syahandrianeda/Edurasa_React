import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { EditingSessionState } from "./EditingSessionState";
import type { EditHistory } from "../history/EditHistory";

export interface QuestionEditingSession {
    document: QuestionBankDocument;
    state: EditingSessionState;
    selectedQuestionId?: string;
    dirty: boolean;
    history: EditHistory;
}