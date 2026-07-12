import type { AnalysisActionResult }
from "../action/AnalysisActionResult";

import type { AnalysisWorkflowStep }
from "./AnalysisWorkflowStep";

import type { AnalysisWorkflowResult }
from "./AnalysisWorkflowResult";

export class AnalysisWorkflowBuilder {

    build(

        actions:
            AnalysisActionResult

    ): AnalysisWorkflowResult {

        const steps:
            AnalysisWorkflowStep[]
            = [];

        for (

            const action

            of actions.actions

        ) {

            steps.push(

                this.createStep(
                    action
                )

            );

        }

        return {

            workflow: {

                steps

            }

        };

    }

    private createStep(

        action:string

    ): AnalysisWorkflowStep {

        switch (

            action

        ) {

            case "BUILD_DRAFT":

                return {

                    code:
                        action,

                    label:
                        "Bangun draft soal"

                };

            case "REVIEW_STRUCTURE":

                return {

                    code:
                        action,

                    label:
                        "Review struktur soal"

                };

            case "REVIEW_SEMANTIC":

                return {

                    code:
                        action,

                    label:
                        "Review semantic marker"

                };

            case "BLOCK_PROCESS":

                return {

                    code:
                        action,

                    label:
                        "Proses diblokir"

                };

            default:

                return {

                    code:
                        action,

                    label:
                        action

                };

        }

    }

}