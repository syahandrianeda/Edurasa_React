import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionBankValidationResult } from "./QuestionBankValidationResult";

export class QuestionBankValidator {

    validate(

        document:
            QuestionBankDocument

    ): QuestionBankValidationResult {

        const issues = [];

        if (

            document.questions.length === 0

        ) {

            issues.push({

                message:
                    "Question bank tidak memiliki soal"

            });

        }

        return {

            valid:
                issues.length === 0,

            issues,

            summary:{

                totalQuestions:
                    document.questions.length,

                issueCount:
                    issues.length

            }

        };

    }

}