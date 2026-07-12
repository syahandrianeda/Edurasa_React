// import type { InlineSemanticReviewResult } from "../InlineSemanticReviewResult";
import type { InlineSemanticReviewResult } from "~/domain/editor-document/inline-semantic/InlineSemanticReviewResult";
import type { InlineSemanticValidationResult } from "../validation/InlineSemanticValidationResult";

export interface InlineSemanticAnalysisResult {
    review: InlineSemanticReviewResult;
    validation: InlineSemanticValidationResult;
}