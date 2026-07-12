import type { QuestionStructure } from "../QuestionStructure";
import type { StructureValidationIssue } from "./StructureValidationIssue";
import type { StructureValidationResult } from "./StructureValidationResult";

export class QuestionStructureValidator {

    validate(

        structure:
            QuestionStructure

    ): StructureValidationResult {

        const issues:
            StructureValidationIssue[]
            = [];

        if (

            !structure.pertanyaan

        ) {

            issues.push({

                code:
                    "QUESTION_NOT_FOUND",

                message:
                    "Pertanyaan tidak ditemukan"

            });

        }

        return {

            valid:
                issues.length === 0,

            issues

        };

    }

}