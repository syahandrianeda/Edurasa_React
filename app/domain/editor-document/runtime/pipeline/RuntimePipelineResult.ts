import type { RuntimePipeline }
from "./RuntimePipeline";

export interface RuntimePipelineResult{

    success:boolean;

    pipeline?:RuntimePipeline;

    message?:string;

}