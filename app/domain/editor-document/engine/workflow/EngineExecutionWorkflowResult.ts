import type { EngineExecutionWorkflow }
from "./EngineExecutionWorkflow";

export interface EngineExecutionWorkflowResult{

    success:boolean;

    workflow?:
        EngineExecutionWorkflow;

    message?:string;

}