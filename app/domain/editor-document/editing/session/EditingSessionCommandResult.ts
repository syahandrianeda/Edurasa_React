import type { EditingAnalysisResult } from "../analysis/EditingAnalysisResult";
import type { QuestionEditingSession } from "./QuestionEditingSession";

export interface EditingSessionCommandResult {
    success:boolean;
    session?: QuestionEditingSession;
    analysis?: EditingAnalysisResult;
    message?:string;
}