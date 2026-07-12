import type { QuestionAnalysisReport }
from "./QuestionAnalysisReport";

import type { QuestionAnalysisSummary }
from "./QuestionAnalysisSummary";

export class QuestionAnalysisSummaryBuilder {

    build(

        report:
            QuestionAnalysisReport

    ): QuestionAnalysisSummary {

        const structureCount =

            report
                .structure
                .aggregate
                .structures
                .length;

        const validStructureCount =

            report
                .structure
                .aggregate
                .validations
                .filter(
                    validation =>
                        validation.valid
                )
                .length;

        const invalidStructureCount =

            structureCount
            -
            validStructureCount;

        const entityCount =

            report
                .semantic
                .review
                .summary
                .entityCount;

        const equationCount =

            report
                .semantic
                .review
                .summary
                .equationCount;

        const semanticIssueCount =

            report
                .semantic
                .validation
                .issues
                .length;

        return {

            structureCount,

            validStructureCount,

            invalidStructureCount,

            entityCount,

            equationCount,

            semanticIssueCount

        };

    }

}