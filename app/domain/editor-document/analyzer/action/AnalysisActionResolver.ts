import type { AnalysisStatusResult }
from "../status/AnalysisStatusResult";

import type { AnalysisAction }
from "./AnalysisAction";

import type { AnalysisActionResult }
from "./AnalysisActionResult";

export class AnalysisActionResolver {

    resolve(

        status:
            AnalysisStatusResult

    ): AnalysisActionResult {

        const actions:
            AnalysisAction[]
            = [];

        switch (

            status.status

        ) {

            case "valid":

                actions.push(
                    "BUILD_DRAFT"
                );

                break;

            case "warning":

                actions.push(
                    "REVIEW_SEMANTIC"
                );

                actions.push(
                    "BUILD_DRAFT"
                );

                break;

            case "invalid":

                actions.push(
                    "REVIEW_STRUCTURE"
                );

                actions.push(
                    "BLOCK_PROCESS"
                );

                break;

        }

        return {

            actions

        };

    }

}