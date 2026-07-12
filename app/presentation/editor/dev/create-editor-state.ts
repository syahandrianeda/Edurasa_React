import type { EditorState }
from "~/domain/editor/runtime/editor-state";

import { dummyDocument }
from "./dummy-document";

export function createEditorState():
    EditorState
{

    return {

        document:
            dummyDocument,

        selection:
            null,

        clipboard:
            null,

        mode:
            "edit" as never,

        history: {

            undoStack: [],

            redoStack: []

        }

    };

}