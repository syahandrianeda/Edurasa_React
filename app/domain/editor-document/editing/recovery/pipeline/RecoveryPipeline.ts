import { RecoveryProcessor }
from "../RecoveryProcessor";

import type { RecoveryPipelineContext }
from "./RecoveryPipelineContext";

import type { RecoveryPipelineResult }
from "./RecoveryPipelineResult";

export class RecoveryPipeline{

    constructor(

        private processor =
            new RecoveryProcessor()

    ){}

    execute(

        context:
            RecoveryPipelineContext

    ):RecoveryPipelineResult{

        return this.processor.process(

            context

        );

    }

}