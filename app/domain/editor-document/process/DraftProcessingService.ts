import type { QuestionNode } from "~/domain/editor/document/question-node";
import type { QuestionDraftCollection } from "../draft/QuestionDraftCollection";
import type { DraftProcessingResult } from "./DraftProcessingResult";
import { DraftCollectionValidator } from "../draft/validation/DraftCollectionValidator"; 
import type { DraftValidationSummary } from "../draft/validation/DraftValidationSummary";
import { QuestionDraftTransformer } from "../transformer/QuestionDraftTransformer";
import type { EditorDocument } from "../EditorDocument";
import { DraftProcessingSuccessPolicy } from "./policy/DraftProcessingSuccessPolicy";
import { QuestionCollectionBuilder } from "../aggregate/QuestionCollectionBuilder";
import { QuestionBankBuilder } from "../bank/QuestionBankBuilder";

export class DraftProcessingService {
    constructor(

        private validator = new DraftCollectionValidator(),
        private transformer = new QuestionDraftTransformer(),
        private successPolicy = new DraftProcessingSuccessPolicy(),
        private collectionBuilder = new QuestionCollectionBuilder(),
        private bankBuilder = new QuestionBankBuilder()

    ) {}

    process(

        drafts:
            QuestionDraftCollection,

        document:
            EditorDocument

    ): DraftProcessingResult{

        const validationSummary = this.validator .validate( drafts );
        const validDrafts = validationSummary .summary .valid;
        const invalidDrafts = validationSummary .summary .invalid;
        const questions: QuestionNode[] = [];

        for ( const draft of drafts.drafts ) {

            const transformed = this.transformer .transform( draft, document );

            if ( transformed.success && transformed.question ) {

                questions.push( transformed.question );

            }

        }
        const policy = this.successPolicy 
                        .evaluate(validDrafts, invalidDrafts, questions.length );
        const aggregate = this.collectionBuilder .build( questions );
        const bank = this.bankBuilder .build( aggregate );
        return {

            // success: invalidDrafts === 0,
            success: policy.success,
            questions,
            summary: {
                totalDrafts: drafts.drafts.length,
                validDrafts,
                invalidDrafts,
                transformedDrafts: questions.length
            },

            pipeline: {
                validationCompleted:true,
                validationPassed: invalidDrafts === 0,
                transformationCompleted:true
            },

            validation: {

                validDrafts,

                invalidDrafts,

                summary: validationSummary .summary

            },
            transformation: {
                transformed: questions.length,
                questions
            },
            policy,
            aggregate,
            bank

        };

    }
}