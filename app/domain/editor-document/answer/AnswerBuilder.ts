import type { Answer } from "~/domain/editor/answers/answer";
import type { QuestionStructure } from "../structure/QuestionStructure";
import type { AnswerBuildResult } from "./AnswerBuildResult";
import { AnswerTypeDetector } from "./AnswerTypeDetector";

export class AnswerBuilder {
    constructor( private detector = new AnswerTypeDetector() ) {}

    build( structure: QuestionStructure ): AnswerBuildResult {
        const type = this.detector.detect( structure );

        const answer: Answer = { type, value:null };

        return {

            success:true,

            answer

        };

    }

}