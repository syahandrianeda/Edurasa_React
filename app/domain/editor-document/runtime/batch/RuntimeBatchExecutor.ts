import type { RuntimeQueue }
from "../queue/RuntimeQueue";

import type { RuntimeScheduler }
from "../scheduler/RuntimeScheduler";

import { RuntimeProcessor }
from "../RuntimeProcessor";

import type { RuntimeBatchExecutionResult }
from "./RuntimeBatchExecutionResult";
import { RuntimeQueueManager } from "../queue/RuntimeQueueManager";

export class RuntimeBatchExecutor{

    constructor(

        private readonly processor=

            new RuntimeProcessor()

    ){}

    execute(

        queue:RuntimeQueue,

        scheduler:RuntimeScheduler

    ):RuntimeBatchExecutionResult{

        let processed=0;

        let failed=0;
        let currentQueue=queue;

        while(true){

            const decision= scheduler.schedule(currentQueue);

            if(!decision.hasNext || !decision.next){
                break;
            }

            const result= this.processor.process(
                    decision.next
                );

            if(result.success){
                processed++;
            }else{
                failed++;
            }

            const dequeued= new RuntimeQueueManager().dequeue(currentQueue);

            if(!dequeued.success || !dequeued.queue){
                break;
            }
            currentQueue= dequeued.queue;
        };
        

        return{

            success:failed===0,

            summary:{

                total:processed+failed,

                processed,

                failed

            }

        };

    }

}