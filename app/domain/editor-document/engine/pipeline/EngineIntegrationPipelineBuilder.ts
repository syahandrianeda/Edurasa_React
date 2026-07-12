import type { EngineExecutionWorkflow }
from "../workflow/EngineExecutionWorkflow";

import type { EngineIntegrationPipeline }
from "./EngineIntegrationPipeline";

import type { EngineIntegrationPipelineResult }
from "./EngineIntegrationPipelineResult";

export class EngineIntegrationPipelineBuilder{

    build(

        workflow:

            EngineExecutionWorkflow

    ):EngineIntegrationPipelineResult{

        const pipeline:EngineIntegrationPipeline={

            workflow

        };

        return{

            success:true,

            pipeline

        };

    }

}