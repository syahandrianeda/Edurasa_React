import type { SemanticDocument }
from "../../semantic/SemanticDocument";

import type { QuestionStructureAnalysisResult }
from "./QuestionStructureAnalysisResult";

import { QuestionStructureDetector }
from "../QuestionStructureDetector";

import { QuestionStructureAggregator }
from "../aggregate/QuestionStructureAggregator";

import { QuestionStructureReviewBuilder }
from "../../review/QuestionStructureReviewBuilder";

export class QuestionStructureAnalysisService {

    constructor(

        private detector =
            new QuestionStructureDetector(),

        private aggregator =
            new QuestionStructureAggregator(),

        private reviewBuilder =
            new QuestionStructureReviewBuilder()

    ) {}

    analyze(

        document:
            SemanticDocument

    ): QuestionStructureAnalysisResult {

        const detection =

            this.detector
                .detect(
                    document
                );

        const aggregate =

            this.aggregator
                .aggregate(

                    detection
                        .structures

                );

        const review =

            this.reviewBuilder
                .build(

                    aggregate
                        .structures

                );

        return {

            detection,

            aggregate,

            review

        };

    }

}