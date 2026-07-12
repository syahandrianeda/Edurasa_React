import type { QuestionStructureReview } from "./QuestionStructureReview";
import type { QuestionStructureReviewSummary } from "./QuestionStructureReviewSummary";

export interface QuestionStructureReviewCollection {

    reviews:
        QuestionStructureReview[];

    summary:
        QuestionStructureReviewSummary;

}