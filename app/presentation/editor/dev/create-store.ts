import { EditorStoreFactory }
from "~/application/editor/EditorStoreFactory";

import type { EditorContext }
from "~/domain/editor/runtime/editor-context";

import { createEditorState }
from "./create-editor-state";

export function createStore()
{

    const state =
        createEditorState();

    const context:
        EditorContext =
    {
        state
    };

    return EditorStoreFactory
        .create(
            context
        );

}