import type { EngineIntegrationPipeline }
from "./EngineIntegrationPipeline";

export interface EngineIntegrationPipelineResult{

    success:boolean;

    pipeline?:
        EngineIntegrationPipeline;

    message?:string;

}