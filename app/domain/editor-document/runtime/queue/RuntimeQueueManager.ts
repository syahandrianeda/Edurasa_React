import type { RuntimeExecutionContext }
from "../context/RuntimeExecutionContext";

import type { RuntimeQueue }
from "./RuntimeQueue";

import type { RuntimeQueueResult }
from "./RuntimeQueueResult";

export class RuntimeQueueManager{

    enqueue(

        queue:RuntimeQueue,

        context:RuntimeExecutionContext

    ):RuntimeQueueResult{

        return{

            success:true,

            queue:{

                items:[

                    ...queue.items,

                    context

                ]

            }

        };

    }

    dequeue(

        queue:RuntimeQueue

    ):RuntimeQueueResult{

        if(queue.items.length===0){

            return{

                success:false,

                message:"Queue kosong."

            };

        }

        return{

            success:true,

            queue:{

                items:

                    queue.items.slice(1)

            }

        };

    }

    peek(

        queue:RuntimeQueue

    ):RuntimeExecutionContext|undefined{

        return queue.items[0];

    }

    clear(

        queue:RuntimeQueue

    ):RuntimeQueueResult{

        return{

            success:true,

            queue:{

                items:[]

            }

        };

    }

}