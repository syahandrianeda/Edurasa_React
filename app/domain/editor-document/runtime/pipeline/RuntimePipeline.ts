import type { RuntimePipelineStep }
from "./RuntimePipelineStep";

export interface RuntimePipeline{

    readonly steps:

        readonly RuntimePipelineStep[];

}