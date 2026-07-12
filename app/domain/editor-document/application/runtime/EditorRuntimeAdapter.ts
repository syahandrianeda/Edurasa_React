import type { EditorRuntime }
from "../../runtime/EditorRuntime";

import type { EditorCommandContext }
from "../../engine/context/EditorCommandContext";

import type { EditorEngineProcessResult }
from "../../engine/EditorEngineProcessResult";

export interface EditorRuntimeAdapter{

    readonly runtime: EditorRuntime;

    execute(
        context: EditorCommandContext
    ): EditorEngineProcessResult;

}