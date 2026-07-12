import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

import type { EditorHostLifecycleExecutionResult }
from "./EditorHostLifecycleExecutionResult";

export interface EditorHostLifecycle{

    readonly runtime:EditorHostRuntime;

    initialize():EditorHostLifecycleExecutionResult;

    activate():EditorHostLifecycleExecutionResult;

    dispose():EditorHostLifecycleExecutionResult;

}