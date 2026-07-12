import type { EditorCommand } from "../../editor-document/engine/command/EditorCommand";
import type { EditorPresentationRuntime } from "../runtime/EditorPresentationRuntime";
import type { EditorPresentationApiExecutionResult } from "./EditorPresentationApiExecutionResult";

export interface EditorPresentationApi{

    readonly runtime:EditorPresentationRuntime;

    execute(

        command:EditorCommand

    ):EditorPresentationApiExecutionResult;

}