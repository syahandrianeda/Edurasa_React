import type { RuntimeExecutionContext }
from "./RuntimeExecutionContext";

export interface RuntimeExecutionContextResult{

    success:boolean;

    context?:
        RuntimeExecutionContext;

    message?:string;

}