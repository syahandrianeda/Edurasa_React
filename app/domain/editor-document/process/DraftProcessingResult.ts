import type { QuestionNode } from "~/domain/editor/document/question-node";
import type { DraftProcessingSummary } from "./DraftProcessingSummary";
import type { DraftProcessingPipeline } from "./DraftProcessingPipeline";
import type { DraftValidationProcessResult } from "./DraftValidationProcessResult";
import type { DraftTransformationResult } from "./DraftTransformationResult";
import type { DraftProcessingPolicyResult } from "./policy/DraftProcessingPolicyResult";
import type { QuestionCollectionAggregate } from "../aggregate/QuestionCollectionAggregate";
import type { QuestionBankBuildResult } from "../bank/QuestionBankBuildResult";

export interface DraftProcessingResult {

    success:boolean;
    questions: QuestionNode[];
    summary: DraftProcessingSummary;
    pipeline: DraftProcessingPipeline; 
    validation: DraftValidationProcessResult;
    transformation: DraftTransformationResult;
    policy: DraftProcessingPolicyResult;
    aggregate: QuestionCollectionAggregate;
    bank: QuestionBankBuildResult;
}