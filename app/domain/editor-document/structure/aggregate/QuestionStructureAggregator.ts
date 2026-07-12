import type { QuestionStructure } from "../QuestionStructure";
import type { QuestionStructureAggregate } from "./QuestionStructureAggregate";
import type { QuestionStructureSummary } from "./QuestionStructureSummary";
import type { StructureValidationResult } from "../validation/StructureValidationResult";
import { QuestionStructureValidator } from "../validation/QuestionStructureValidator";

export class QuestionStructureAggregator {

    constructor(

        private validator =
            new QuestionStructureValidator()

    ) {}

    aggregate(

        structures:
            QuestionStructure[]

    ): QuestionStructureAggregate {

        const validations:

            StructureValidationResult[]

            = structures.map(

                structure =>

                    this.validator
                        .validate(
                            structure
                        )

            );

        const validStructures =

            validations.filter(

                validation =>

                    validation.valid

            ).length;

        const summary:
            QuestionStructureSummary = {

            totalStructures:
                structures.length,

            validStructures,

            invalidStructures:
                structures.length
                -
                validStructures

        };

        return {

            structures,

            validations,

            summary

        };

    }

}