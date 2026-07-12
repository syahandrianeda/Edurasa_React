import type { EditorCommand }
from "../engine/command/EditorCommand";

import type { EditorRuntime }
from "./EditorRuntime";

import type { RuntimeExecutionOptions }
from "./context/RuntimeExecutionOptions";

import type { RuntimeExecutorResult }
from "./RuntimeExecutorResult";

import { RuntimeExecutionContextBuilder }
from "./context/RuntimeExecutionContextBuilder";

import { RuntimeQueueManager }
from "./queue/RuntimeQueueManager";

import { RuntimeBatchExecutor }
from "./batch/RuntimeBatchExecutor";

export class RuntimeExecutor{

    constructor(

        private readonly contextBuilder=
            new RuntimeExecutionContextBuilder(),

        private readonly queueManager=
            new RuntimeQueueManager(),

        private readonly batchExecutor=
            new RuntimeBatchExecutor()

    ){}

    execute(

        runtime:EditorRuntime,

        command:EditorCommand,

        options?:Partial<RuntimeExecutionOptions>

    ):RuntimeExecutorResult{

        const context=

            this.contextBuilder.build(

                runtime,

                command,

                options

            );

        if(

            !context.success ||

            !context.context

        ){

            return{

                success:false,

                message:context.message

            };

        }

        const queued=

            this.queueManager.enqueue(

                runtime.queue,

                context.context

            );

        if(

            !queued.success ||

            !queued.queue

        ){

            return{

                success:false,

                message:queued.message

            };

        }

        const execution=

            this.batchExecutor.execute(

                queued.queue,

                runtime.scheduler

            );

        if(!execution.success){

            return{

                success:false,

                message:execution.message

            };

        }

        return{

            success:true,

            runtime:{

                ...runtime,

                queue:queued.queue

            }

        };

    }

}