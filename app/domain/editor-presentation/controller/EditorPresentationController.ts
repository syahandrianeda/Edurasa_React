import type { EditorCommand }
from "../../editor-document/engine/command/EditorCommand";

import type { EditorPresentationStore }
from "../store/EditorPresentationStore";

import type { EditorPresentationControllerExecutionResult }
from "./EditorPresentationControllerExecutionResult";

export interface EditorPresentationController{

    readonly store:EditorPresentationStore;

    execute(

        command:EditorCommand

    ):EditorPresentationControllerExecutionResult;

}