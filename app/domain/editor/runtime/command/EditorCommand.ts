import type { EditorContext } from "../editor-context";
import type { CommandResult } from "./CommandResult";


export interface EditorCommand {

    execute(
        context: EditorContext
    ): CommandResult;

}