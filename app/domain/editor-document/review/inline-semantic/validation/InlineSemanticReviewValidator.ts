// import type { InlineSemanticReviewResult } from "../InlineSemanticReviewResult";
import type { InlineSemanticReviewResult } from "~/domain/editor-document/inline-semantic/InlineSemanticReviewResult";
import { InlineSemanticValidator } from "./InlineSemanticValidator";

export class InlineSemanticReviewValidator {

    constructor(

        private validator =
            new InlineSemanticValidator()

    ) {}

    validate(

        reviewResult: InlineSemanticReviewResult

    ) {

        return this.validator
            .validate(
                reviewResult.review
            );

    }

}