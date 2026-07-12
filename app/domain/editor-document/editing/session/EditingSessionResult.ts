import type { QuestionEditingSession } from "./QuestionEditingSession";
import type { EditingSessionSummary } from "./EditingSessionSummary";

export interface EditingSessionResult {
    session: QuestionEditingSession;
    summary: EditingSessionSummary;
}