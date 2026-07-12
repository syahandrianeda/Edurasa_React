import type { QuestionStructure } from "../structure/QuestionStructure";
import type { AnswerType } from "~/domain/editor/answers/answer-type";

export class AnswerTypeDetector {

    detect( structure: QuestionStructure ): AnswerType {

        if ( structure.opsi.length > 0 ) {
            return "pg";
        }
        
        return "pg";
    }
}