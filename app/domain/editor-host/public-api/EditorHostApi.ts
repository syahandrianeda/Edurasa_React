import type { EditorCommand }
from "../../editor-document/engine/command/EditorCommand";

import type { EditorHostProvider }
from "../provider/EditorHostProvider";

import type { EditorHostApiExecutionResult }
from "./EditorHostApiExecutionResult";

export interface EditorHostApi{

    readonly provider:EditorHostProvider;

    execute(

        command:EditorCommand

    ):EditorHostApiExecutionResult;

}