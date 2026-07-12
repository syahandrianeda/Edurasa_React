import { EngineIntegrationPipelineBuilder } from "../pipeline/EngineIntegrationPipelineBuilder";
import { EngineDependencyResolverBuilder } from "../service/EngineDependencyResolverBuilder";
import { EngineServiceRegistryBuilder } from "../service/EngineServiceRegistryBuilder";
import { EngineExecutionWorkflowBuilder } from "../workflow/EngineExecutionWorkflowBuilder";
import type { EditorContext } from "./EditorContext";

import type { EditorContextResult }
from "./EditorContextResult";

export class EditorContextBuilder{

    build():EditorContextResult{
        const registry = new EngineServiceRegistryBuilder().build();
        const resolver = new EngineDependencyResolverBuilder().build();
        const workflow = new EngineExecutionWorkflowBuilder().build();
        const pipeline = new EngineIntegrationPipelineBuilder().build( workflow.workflow! );
        const context:EditorContext={

            subsystems:[

                "analysis",

                "draft-processing",

                "question-bank",

                "editing",

                "mutation",

                "recovery"

            ],
            registry: registry.registry!,
            resolver,
            workflow: workflow.workflow!,
            pipeline: pipeline.pipeline!
        };

        return{
            success:true,
            context
        };
    }
}