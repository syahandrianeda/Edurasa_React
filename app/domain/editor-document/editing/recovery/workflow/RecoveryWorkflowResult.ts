import type { RecoveryWorkflow }
from "./RecoveryWorkflow";

export interface RecoveryWorkflowResult{

    success:boolean;

    workflow?:
        RecoveryWorkflow;

    message?:string;

}