import type { RuntimeExecutionContext }
from "../context/RuntimeExecutionContext";

export interface RuntimeScheduleDecision{

    readonly next?:

        RuntimeExecutionContext;

    readonly hasNext:boolean;

}