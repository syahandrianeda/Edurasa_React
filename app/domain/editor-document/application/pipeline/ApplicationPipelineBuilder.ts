import type { ApplicationPipeline }
from "./ApplicationPipeline";

import type { ApplicationPipelineResult }
from "./ApplicationPipelineResult";

import { EditorApplicationProcessor }
from "../EditorApplicationProcessor";

export class ApplicationPipelineBuilder{

    build():ApplicationPipelineResult{

        const pipeline:ApplicationPipeline={

            processor:new EditorApplicationProcessor()

        };

        return{

            success:true,

            pipeline

        };

    }

}