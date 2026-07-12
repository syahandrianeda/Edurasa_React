import type { MutationWorkflow }
from "./MutationWorkflow";

export interface MutationWorkflowResult {

    success:boolean;

    workflow?:
        MutationWorkflow;

}