import type { EditorRuntime } from "../../runtime/EditorRuntime";
import type { EditorEngine }
from "../EditorEngine";

import type { EditorCommand }
from "../command/EditorCommand";

export interface EditorCommandContext{

    engine:
        EditorEngine;

    command:
        EditorCommand;
    runtime: EditorRuntime;


}