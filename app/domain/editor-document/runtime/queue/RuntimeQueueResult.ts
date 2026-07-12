import type { RuntimeQueue }
from "./RuntimeQueue";

export interface RuntimeQueueResult{

    success:boolean;

    queue?:RuntimeQueue;

    message?:string;

}