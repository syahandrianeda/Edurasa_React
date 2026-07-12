import type { EngineIntegrationPipeline } from "../pipeline/EngineIntegrationPipeline";
import type { EngineDependencyResolver } from "../service/EngineDependencyResolver";
import type { EngineServiceRegistry } from "../service/EngineServiceRegistry";
import type { EngineExecutionWorkflow } from "../workflow/EngineExecutionWorkflow";
import type { EditorSubsystem } from "./EditorSubsystem";

export interface EditorContext{

    subsystems: EditorSubsystem[];
    registry: EngineServiceRegistry;
    resolver: EngineDependencyResolver;
    workflow: EngineExecutionWorkflow;
    pipeline: EngineIntegrationPipeline;
}