import type { EditorCommand }
from "~/domain/editor-document/engine/command/EditorCommand";

export interface ShortcutHook{

    dispatch(

        command:EditorCommand

    ):boolean;

}