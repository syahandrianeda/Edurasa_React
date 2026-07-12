import type { QuestionBankValidationResult } from "../validation/QuestionBankValidationResult";
import type { QuestionBankBuildStatusResult } from "../status/QuestionBankBuildStatusResult";
import type { QuestionBankRecommendationResult } from "../recommendation/QuestionBankRecommendationResult";
import type { QuestionBankBuildActionResult } from "../action/QuestionBankBuildActionResult";
import type { QuestionBankBuildWorkflowResult } from "../workflow/QuestionBankBuildWorkflowResult";
import type { QuestionBankBuildPipelineResult } from "./QuestionBankBuildPipelineResult";

export class QuestionBankBuildPipelineBuilder {
    build(
        validation: QuestionBankValidationResult,
        status: QuestionBankBuildStatusResult,
        recommendation: QuestionBankRecommendationResult,
        actions: QuestionBankBuildActionResult,
        workflow: QuestionBankBuildWorkflowResult
    ): QuestionBankBuildPipelineResult {

        return {
            pipeline:{
                validation,
                status,
                recommendation,
                actions,
                workflow
            }
        };
    }
}