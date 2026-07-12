import type { QuestionDraft }
from "../QuestionDraft";

import type { DraftValidationIssue }
from "./DraftValidationIssue";

import type { DraftValidationResult }
from "./DraftValidationResult";

export class DraftValidator {

    validate(
        draft:
            QuestionDraft
    ): DraftValidationResult {

        const issues:
            DraftValidationIssue[]
            = [];

        if (
            !draft.structure
                .pertanyaan
        ) {

            issues.push({

                code:
                    "QUESTION_REQUIRED",

                message:
                    "Pertanyaan wajib ada"

            });

        }

        return {

            valid:
                issues.length === 0,

            issues

        };

    }

}