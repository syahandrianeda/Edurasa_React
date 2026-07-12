import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionBankBuildAggregate } from "./QuestionBankBuildAggregate";
import type { QuestionBankValidationResult } from "./validation/QuestionBankValidationResult";
import type { QuestionBankBuildStatusResult } from "./status/QuestionBankBuildStatusResult";
import type { QuestionBankRecommendationResult } from "./recommendation/QuestionBankRecommendationResult";
import type { QuestionBankBuildActionResult } from "./action/QuestionBankBuildActionResult";
import type { QuestionBankBuildWorkflowResult } from "./workflow/QuestionBankBuildWorkflowResult";
import type { QuestionBankBuildPipelineResult } from "./pipeline/QuestionBankBuildPipelineResult";

export interface QuestionBankBuildResult {

    success:boolean;

    // document?: QuestionBankDocument;
    aggregate?: QuestionBankBuildAggregate;
    
    message?:string;
    validation?: QuestionBankValidationResult;
    status?: QuestionBankBuildStatusResult;
    recommendation?: QuestionBankRecommendationResult;
    actions?: QuestionBankBuildActionResult;
    workflow?: QuestionBankBuildWorkflowResult;
    pipeline?: QuestionBankBuildPipelineResult;

}