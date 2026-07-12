import type { EditorCommand }
from "~/domain/editor-document/engine/command/EditorCommand";

export interface EditorHook{

    execute(

        command:EditorCommand

    ):boolean;

}