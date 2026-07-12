import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionBankBuildAggregate } from "./QuestionBankBuildAggregate";

export class QuestionBankBuildAggregator {

    aggregate( document: QuestionBankDocument ): QuestionBankBuildAggregate {
        return {
            document,
            summary:{
                version: document.version,
                totalQuestions: document.questions.length,
                totalMediaResources: document.mediaResources.length
            }

        };

    }

}