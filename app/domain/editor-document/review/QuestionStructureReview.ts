import type { QuestionStructure } from "../structure/QuestionStructure";
import type { ReviewStatus } from "./ReviewStatus";
import type { ReviewComment } from "./ReviewComment";

export interface QuestionStructureReview {

    structure:
        QuestionStructure;

    status:
        ReviewStatus;

    comments:
        ReviewComment[];

}