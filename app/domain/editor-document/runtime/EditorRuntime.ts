import type { EditorEngine } from "../engine/EditorEngine";
import type { EditorRuntimeState } from "./EditorRuntimeState";
import type { RuntimeEventLoop } from "./loop/RuntimeEventLoop";
import type { RuntimePerformance } from "./performance/RuntimePerformance";
import type { RuntimePipeline } from "./pipeline/RuntimePipeline";
import type { RuntimeQueue } from "./queue/RuntimeQueue";
import type { RuntimeScheduler } from "./scheduler/RuntimeScheduler";

export interface EditorRuntime{

    readonly id:string;

    readonly engine: EditorEngine;
    readonly state: EditorRuntimeState;
    readonly scheduler: RuntimeScheduler;
    readonly queue: RuntimeQueue;
    readonly performance: RuntimePerformance;
    readonly eventLoop: RuntimeEventLoop;
    readonly pipeline: RuntimePipeline;
}