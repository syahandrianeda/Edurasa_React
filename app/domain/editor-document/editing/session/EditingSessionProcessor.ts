import type { QuestionEditingSession } from "./QuestionEditingSession";
import type { QuestionEditCommand } from "../command/QuestionEditCommand";
import type { EditingSessionCommandResult } from "./EditingSessionCommandResult";
import { EditHistoryManager } from "../history/EditHistoryManager";
import type { EditHistoryEntry } from "../history/EditHistoryEntry";
import { QuestionChangeDetector } from "../change/QuestionChangeDetector";
import { EditingAnalysisWorkflow } from "../analysis/EditingAnalysisWorkflow";
import type { EditorDocument } from "../../EditorDocument";
import type { SemanticDocument } from "../../semantic/SemanticDocument";

export class EditingSessionProcessor {
    constructor(
        private history = new EditHistoryManager(),
        private detector = new QuestionChangeDetector(),
        private analysis = new EditingAnalysisWorkflow()
    ){}
    // process(
    //     session: QuestionEditingSession,
    //     command: QuestionEditCommand
    // ): EditingSessionCommandResult 
    process(
            session: QuestionEditingSession,
            command: QuestionEditCommand,
            document: EditorDocument,
            semantic: SemanticDocument
        ){

        const result = command.execute( session.document );
        if ( !result.success || !result.document ) {

            return {
                success:false,
                message: result.message
            };
        }
        const changeResult = this.detector .detect(
                    session.document,
                    result.document,
                    session.selectedQuestionId
                    ??
                    ""
                );
        const analysis = this.analysis .analyze(
                    changeResult.changeSet,
                    document,
                    semantic
                );

        const historyEntry: EditHistoryEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            questionId: session.selectedQuestionId ?? "",
            changeSet: changeResult.changeSet
        };

        const history = this.history.append( session.history, historyEntry );

        return {
            success:true,
            session:{
                ...session,
                document: result.document,
                dirty:true,
                state:"editing",
                history: history.history
            },
            analysis
        };
    }
}