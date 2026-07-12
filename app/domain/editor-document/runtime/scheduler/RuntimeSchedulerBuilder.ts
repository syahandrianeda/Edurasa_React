import type { RuntimeScheduler }
from "./RuntimeScheduler";

import type { RuntimeSchedulerResult }
from "./RuntimeSchedulerResult";

export class RuntimeSchedulerBuilder{

    build():RuntimeSchedulerResult{

        const scheduler:RuntimeScheduler={

            schedule(queue){

                return{

                    next:

                        queue.items[0],

                    hasNext:

                        queue.items.length>0

                };

            }

        };

        return{

            success:true,

            scheduler

        };

    }

}