import type { EditorCommand }
from "~/domain/editor-document/engine/command/EditorCommand";

export interface ReactEditorApi{

    execute(

        command:EditorCommand

    ):boolean;

}