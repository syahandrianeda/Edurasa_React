import type { RuntimeExecutionContext }
from "../context/RuntimeExecutionContext";

export interface RuntimeQueue{

    readonly items:

        readonly RuntimeExecutionContext[];

}