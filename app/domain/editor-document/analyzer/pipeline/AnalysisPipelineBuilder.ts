import type { AnalysisWorkflowResult }
from "../workflow/AnalysisWorkflowResult";

import type { AnalysisPipelineStage }
from "./AnalysisPipelineStage";

import type { AnalysisPipelineResult }
from "./AnalysisPipelineResult";

export class AnalysisPipelineBuilder {

    build(

        workflow:
            AnalysisWorkflowResult

    ): AnalysisPipelineResult {

        const stages:
            AnalysisPipelineStage[]
            = [];

        for (

            const step

            of workflow
                .workflow
                .steps

        ) {

            stages.push({

                id:
                    step.code,

                completed:
                    false

            });

        }

        return {

            pipeline: {

                stages

            }

        };

    }

}