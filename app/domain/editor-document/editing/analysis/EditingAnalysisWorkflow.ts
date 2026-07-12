import type { EditorDocument } from "../../EditorDocument";
import type { SemanticDocument } from "../../semantic/SemanticDocument";
import type { QuestionChangeSet } from "../change/QuestionChangeSet";
import type { EditingAnalysisResult } from "./EditingAnalysisResult";
import { IncrementalAnalyzer } from "./IncrementalAnalyzer";

export class EditingAnalysisWorkflow {

    constructor(
        private analyzer = new IncrementalAnalyzer()
    ){}

    analyze(
        changeSet: QuestionChangeSet,
        document: EditorDocument,
        semantic: SemanticDocument
    ): EditingAnalysisResult {

        return {

            analysis: this.analyzer.analyze( 
                { changeSet }, 
                document, 
                semantic 
            ) 
        };

    }

}