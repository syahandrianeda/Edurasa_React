import type { EditorRuntime }
from "../runtime/EditorRuntime";
import type { EditorPublicApi } from "./api/EditorPublicApi";

import type { EditorApplicationState }
from "./EditorApplicationState";
import type { ApplicationEventBridge } from "./event/ApplicationEventBridge";
import type { EditorPersistencePort } from "./persistence/EditorPersistencePort";
import type { EditorRuntimeAdapter } from "./runtime/EditorRuntimeAdapter";
import type { EditorSession } from "./session/EditorSession";
import type { EditorWorkspace } from "./workspace/EditorWorkspace";

export interface EditorApplication{

    readonly runtime: EditorRuntime;

    readonly state: EditorApplicationState;
    readonly session:EditorSession;
    readonly workspace: EditorWorkspace;
    readonly runtimeAdapter: EditorRuntimeAdapter;
    readonly persistence: EditorPersistencePort;
    readonly eventBridge: ApplicationEventBridge;
    // readonly api: EditorPublicApi;

}