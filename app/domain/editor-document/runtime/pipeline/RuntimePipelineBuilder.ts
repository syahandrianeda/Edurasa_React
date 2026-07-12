import type { RuntimePipeline }
from "./RuntimePipeline";

import type { RuntimePipelineResult }
from "./RuntimePipelineResult";

export class RuntimePipelineBuilder{

    build():RuntimePipelineResult{

        const pipeline:RuntimePipeline={

            steps:[

                "queue",

                "scheduler",

                "executor",

                "performance",

                "eventLoop"

            ]

        };

        return{

            success:true,

            pipeline

        };

    }

}