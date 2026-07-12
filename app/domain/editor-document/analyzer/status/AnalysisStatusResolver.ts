import type { QuestionAnalysisReport }
from "../QuestionAnalysisReport";

import type { AnalysisStatusResult }
from "./AnalysisStatusResult";

export class AnalysisStatusResolver {

    resolve(

        report:
            QuestionAnalysisReport

    ): AnalysisStatusResult {

        const invalidStructureCount =

            report
                .structure
                .aggregate
                .validations
                .filter(

                    validation =>

                        !validation.valid

                )
                .length;

        const semanticIssueCount =

            report
                .semantic
                .validation
                .issues
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

        const messages:
            string[]
            = [];

        if (

            invalidStructureCount > 0

        ) {

            messages.push(

                `${invalidStructureCount} struktur tidak valid`

            );

        }

        if (

            semanticIssueCount > 0

        ) {

            messages.push(

                `${semanticIssueCount} issue semantic ditemukan`

            );

        }

        let status:
            "valid"
            | "warning"
            | "invalid";

        if (

            invalidStructureCount > 0

        ) {

            status =
                "invalid";

        }

        else if (

            semanticIssueCount > 0

        ) {

            status =
                "warning";

        }

        else {

            status =
                "valid";

        }

        return {

            status,

            messages,

            summary: {

                validStructureCount,

                invalidStructureCount,

                semanticIssueCount

            }

        };

    }

}