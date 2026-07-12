import type { EditorApplication }
from "./EditorApplication";

import type { EditorApplicationResult }
from "./EditorApplicationResult";

import { EditorRuntimeBuilder }
from "../runtime/EditorRuntimeBuilder";
import { EditorEngineBuilder } from "../engine/EditorEngineBuilder";
import { EditorSessionBuilder } from "./session/EditorSessionBuilder";
import { EditorWorkspaceBuilder } from "./workspace/EditorWorkspaceBuilder";
import { EditorRuntimeAdapterBuilder } from "./runtime/EditorRuntimeAdapterBuilder";
import { EditorPersistenceBuilder } from "./persistence/EditorPersistenceBuilder";
import { ApplicationEventBridgeBuilder } from "./event/ApplicationEventBridgeBuilder";
import { EditorPublicApiBuilder } from "./api/EditorPublicApiBuilder";

export class EditorApplicationBuilder{

    build():EditorApplicationResult{

        const engine = new EditorEngineBuilder().build();

        if (!engine.success || !engine.engine) {

            return {
                success:false,
                message:"Engine gagal dibuat."
            };

        }

        const runtime = new EditorRuntimeBuilder().build(engine.engine);

        if (!runtime.success || !runtime.runtime) {

            return {
                success:false,
                message:"Runtime gagal dibuat."
            };

        }
        const session = new EditorSessionBuilder().build();

        if (!session.success || !session.session) {

            return {
                success:false,
                message:"Session gagal dibuat."
            };

        }
        const workspace = new EditorWorkspaceBuilder().build();

        if(
            !workspace.success ||
            !workspace.workspace
        ){

            return{

                success:false,

                message:"Workspace gagal dibuat."

            };

        }
        const adapter = new EditorRuntimeAdapterBuilder().build(runtime.runtime);

        if(
            !adapter.success ||
            !adapter.adapter
        ){

            return{

                success:false,

                message:"Runtime Adapter gagal dibuat."

            };

        }
        const persistence = new EditorPersistenceBuilder().build();
        const eventBridge = new ApplicationEventBridgeBuilder().build();

        if( !eventBridge.success || !eventBridge.bridge ){

            return{

                success:false,

                message:"Application Event Bridge gagal dibuat."

            };

        }
        

        const application:EditorApplication={

            runtime:runtime.runtime,
            session:session.session,
            workspace: workspace.workspace,
            runtimeAdapter: adapter.adapter,
            persistence,
            eventBridge:eventBridge.bridge,
            state:"idle"

        };


        return{

            success:true,

            application

        };

    }

}