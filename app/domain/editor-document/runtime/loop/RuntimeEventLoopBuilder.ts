import type { RuntimeEventLoop }
from "./RuntimeEventLoop";

import type { RuntimeEventLoopResult }
from "./RuntimeEventLoopResult";

export class RuntimeEventLoopBuilder{

    build():RuntimeEventLoopResult{

        const eventLoop:RuntimeEventLoop={

            tick(runtime){

                return{

                    processed:

                        runtime.queue.items.length>0

                };

            }

        };

        return{

            success:true,

            eventLoop

        };

    }

}