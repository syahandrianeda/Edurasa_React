import type { RuntimeScheduler }
from "./RuntimeScheduler";

export interface RuntimeSchedulerResult{

    success:boolean;

    scheduler?:

        RuntimeScheduler;

    message?:string;

}