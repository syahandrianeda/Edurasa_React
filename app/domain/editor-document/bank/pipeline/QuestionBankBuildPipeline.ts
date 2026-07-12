import type { QuestionBankBuildWorkflowResult } from "../workflow/QuestionBankBuildWorkflowResult";
import type { QuestionBankValidationResult } from "../validation/QuestionBankValidationResult";
import type { QuestionBankBuildStatusResult } from "../status/QuestionBankBuildStatusResult";
import type { QuestionBankRecommendationResult } from "../recommendation/QuestionBankRecommendationResult";
import type { QuestionBankBuildActionResult } from "../action/QuestionBankBuildActionResult";

export interface QuestionBankBuildPipeline {
    validation: QuestionBankValidationResult;
    status: QuestionBankBuildStatusResult;
    recommendation: QuestionBankRecommendationResult;
    actions: QuestionBankBuildActionResult;
    workflow: QuestionBankBuildWorkflowResult;
}