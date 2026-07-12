import type { ApplicationPipeline }
from "./ApplicationPipeline";

export interface ApplicationPipelineResult{

    success:boolean;

    pipeline?:ApplicationPipeline;

    message?:string;

}