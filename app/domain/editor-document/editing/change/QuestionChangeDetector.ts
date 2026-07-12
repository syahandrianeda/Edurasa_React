import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionChange } from "./QuestionChange";
import type { QuestionChangeDetectionResult } from "./QuestionChangeDetectionResult";
// import type { QuestionChangeDetectionResult } from "./QuestionChangeDetectionResult";

export class QuestionChangeDetector {

    detect(

        before:
            QuestionBankDocument,

        after:
            QuestionBankDocument,

        questionId:
            string

    ): QuestionChangeDetectionResult {

        // sementara masih berupa placeholder

        const change: QuestionChange = {

            questionId,

            field:"document",

            oldValue:
                before,

            newValue:
                after

        };

        return {

            changeSet:{

                changes:[

                    change

                ]

            }

        };

    }

}