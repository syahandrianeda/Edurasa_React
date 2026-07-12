import type { StructureDetectionResult }
from "../StructureDetectionResult";

import type { QuestionStructureAggregate }
from "../aggregate/QuestionStructureAggregate";

import type { QuestionStructureReviewCollection }
from "../../review/QuestionStructureReviewCollection";

export interface QuestionStructureAnalysisResult {

    detection:
        StructureDetectionResult;

    aggregate:
        QuestionStructureAggregate;

    review:
        QuestionStructureReviewCollection;

}