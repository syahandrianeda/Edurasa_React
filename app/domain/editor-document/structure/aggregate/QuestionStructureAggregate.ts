import type { QuestionStructure }
from "../QuestionStructure";

import type { StructureValidationResult }
from "../validation/StructureValidationResult";

import type { QuestionStructureSummary }
from "./QuestionStructureSummary";

export interface QuestionStructureAggregate {

    structures:
        QuestionStructure[];

    validations:
        StructureValidationResult[];

    summary:
        QuestionStructureSummary;

}