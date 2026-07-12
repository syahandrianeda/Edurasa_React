import type { EngineExecutionWorkflow }
from "./EngineExecutionWorkflow";

import type { EngineExecutionWorkflowResult }
from "./EngineExecutionWorkflowResult";

export class EngineExecutionWorkflowBuilder{

    build():

        EngineExecutionWorkflowResult{

        const workflow:EngineExecutionWorkflow={

            steps:[]

        };

        return{

            success:true,

            workflow

        };

    }

}