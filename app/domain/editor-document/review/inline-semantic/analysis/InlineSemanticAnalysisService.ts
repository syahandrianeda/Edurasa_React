import type { EditorDocument } from "../../../EditorDocument";
import type { SemanticMarker } from "../../../semantic/SemanticMarker";
import type { InlineSemanticAnalysisResult } from "./InlineSemanticAnalysisResult";
import { InlineSemanticExtractor } from "../../../inline-semantic/InlineSemanticExtractor";
// import { InlineSemanticReviewBuilder } from "../InlineSemanticReviewBuilder";
import { InlineSemanticReviewValidator } from "../validation/InlineSemanticReviewValidator";
import { InlineSemanticReviewBuilder } from "~/domain/editor-document/inline-semantic/InlineSemanticReviewBuilder";

export class InlineSemanticAnalysisService {

    constructor(
        private extractor = new InlineSemanticExtractor(),
        private reviewBuilder = new InlineSemanticReviewBuilder(),
        private validator = new InlineSemanticReviewValidator()
    ) {}

    analyze( markers: SemanticMarker[], document: EditorDocument ): InlineSemanticAnalysisResult {
        const extractionResult = this.extractor.extract( markers, document );
        const reviewResult = this.reviewBuilder .build( extractionResult .collection );
        const validationResult = this.validator .validate( reviewResult );

        return {
            review: reviewResult,
            validation: validationResult
        };

    }

}