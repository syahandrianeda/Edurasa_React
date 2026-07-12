import type { RuntimeQueue }
from "./RuntimeQueue";

import type { RuntimeQueueResult }
from "./RuntimeQueueResult";

export class RuntimeQueueBuilder{

    build():RuntimeQueueResult{

        const queue:RuntimeQueue={

            items:[]

        };

        return{

            success:true,

            queue

        };

    }

}