import type { EditorRuntime } from "../EditorRuntime";
import type { EditorCommand } from "../../engine/command/EditorCommand";
import type { RuntimeExecutionOptions } from "./RuntimeExecutionOptions";
export interface RuntimeExecutionContext{

    readonly runtime:
        EditorRuntime;

    readonly command:
        EditorCommand;

    readonly options:
        RuntimeExecutionOptions;

}