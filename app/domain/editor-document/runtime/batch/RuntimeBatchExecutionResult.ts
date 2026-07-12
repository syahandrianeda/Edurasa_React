import type { RuntimeBatchSummary }
from "./RuntimeBatchSummary";

export interface RuntimeBatchExecutionResult{

    success:boolean;

    summary:RuntimeBatchSummary;

    message?:string;

}