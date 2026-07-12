import type { EditorEngine }
from "../engine/EditorEngine";

import type { EditorRuntime }
from "./EditorRuntime";

import type { EditorRuntimeResult }
from "./EditorRuntimeResult";
import { RuntimeEventLoopBuilder } from "./loop/RuntimeEventLoopBuilder";
import { RuntimePerformanceBuilder } from "./performance/RuntimePerformanceBuilder";
import { RuntimePipelineBuilder } from "./pipeline/RuntimePipelineBuilder";
import { RuntimeQueueBuilder } from "./queue/RuntimeQueueBuilder";
import { RuntimeSchedulerBuilder } from "./scheduler/RuntimeSchedulerBuilder";

export class EditorRuntimeBuilder{

    build(

        engine:EditorEngine

    ):EditorRuntimeResult{
        const scheduler= new RuntimeSchedulerBuilder().build();
        const queue= new RuntimeQueueBuilder().build();
        const performance= new RuntimePerformanceBuilder().build();
        const eventLoop= new RuntimeEventLoopBuilder().build();
        const pipeline= new RuntimePipelineBuilder().build();
        const runtime:EditorRuntime={

            id:crypto.randomUUID(),

            engine,

            state:"idle",
            scheduler: scheduler.scheduler!,
            queue: queue.queue!,
            performance: performance.performance!,
            eventLoop: eventLoop.eventLoop!,
            pipeline: pipeline.pipeline!

        };

        return{

            success:true,

            runtime

        };

    }

}