import type { EditorCommand } from "../../editor-document/engine/command/EditorCommand";
import type { EditorPresentationController } from "../controller/EditorPresentationController";
import type { EditorPresentationCommandDispatcherExecutionResult } from "./EditorPresentationCommandDispatcherExecutionResult";

export interface EditorPresentationCommandDispatcher{

    readonly controller:EditorPresentationController;

    dispatch(

        command:EditorCommand

    ):EditorPresentationCommandDispatcherExecutionResult;

}