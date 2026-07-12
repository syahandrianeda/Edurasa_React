import type { QuestionBankValidationIssue }
from "./QuestionBankValidationIssue";

import type { QuestionBankValidationSummary } from "./QuestionBankValidationSummary";

export interface QuestionBankValidationResult {
    valid:boolean;
    issues: QuestionBankValidationIssue[];
    summary: QuestionBankValidationSummary;
}