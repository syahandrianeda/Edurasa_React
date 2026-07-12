import type { EditorCommand }
from "./EditorCommand";

import type { EditorCommandResult }
from "./EditorCommandResult";

export interface EditorCommandHandler{

    handle(

        command:
            EditorCommand

    ):EditorCommandResult;

}