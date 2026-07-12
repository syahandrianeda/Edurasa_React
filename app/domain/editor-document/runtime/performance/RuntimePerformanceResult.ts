import type { RuntimePerformance }
from "./RuntimePerformance";

export interface RuntimePerformanceResult{

    success:boolean;

    performance?:RuntimePerformance;

    message?:string;

}