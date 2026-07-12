import type { EditorCommand }
from "~/domain/editor-document/engine/command/EditorCommand";

export interface CommandHook{

    execute(

        command:EditorCommand

    ):boolean;

}