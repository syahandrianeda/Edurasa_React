import type { QuestionDraftCollection } from "../QuestionDraftCollection";
import type { DraftValidationResult } from "./DraftValidationResult";
import type { DraftValidationSummary } from "./DraftValidationSummary";
import { DraftValidator } from "./DraftValidator";

export interface DraftCollectionValidationResult {

    validations:
        DraftValidationResult[];

    summary:
        DraftValidationSummary;

}

export class DraftCollectionValidator {

    constructor(

        private validator = new DraftValidator()

    ) {}

    validate( collection: QuestionDraftCollection ): DraftCollectionValidationResult {

        const validations = collection.drafts
                .map(
                    draft =>
                        this.validator
                            .validate(
                                draft
                            )
                );
        const valid = validations.filter( result => result.valid ).length;
        
        return {

            validations,

            summary:{

                total:
                    validations.length,

                valid,

                invalid:
                    validations.length
                    -
                    valid

            }

        };

    }

}