import type { QuestionAnalysisReport }
from "../QuestionAnalysisReport";

import type { AnalysisRecommendation }
from "./AnalysisRecommendation";

import type { AnalysisRecommendationResult }
from "./AnalysisRecommendationResult";

export class AnalysisRecommendationBuilder {

    build(

        report:
            QuestionAnalysisReport

    ): AnalysisRecommendationResult {

        const recommendations:
            AnalysisRecommendation[]
            = [];

        this.handleStructureRecommendations(
            report,
            recommendations
        );

        this.handleSemanticRecommendations(
            report,
            recommendations
        );

        return {

            recommendations

        };

    }

    private handleStructureRecommendations(

        report:
            QuestionAnalysisReport,

        recommendations:
            AnalysisRecommendation[]

    ): void {

        const invalidCount =

            report
                .structure
                .aggregate
                .validations
                .filter(

                    validation =>

                        !validation.valid

                )
                .length;

        if (

            invalidCount > 0

        ) {

            recommendations.push({

                code:
                    "REVIEW_STRUCTURE",

                message:
                    "Periksa struktur soal yang belum valid"

            });

        }

    }

    private handleSemanticRecommendations(

        report:
            QuestionAnalysisReport,

        recommendations:
            AnalysisRecommendation[]

    ): void {

        const issueCount =

            report
                .semantic
                .validation
                .issues
                .length;

        if (

            issueCount > 0

        ) {

            recommendations.push({

                code:
                    "REVIEW_SEMANTIC",

                message:
                    "Periksa entity atau equation yang bermasalah"

            });

        }

    }

}