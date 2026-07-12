import { useContext, useSyncExternalStore } from "react";
import { EditorContext } from "../provider/EditorContext";

export function useEditor()
{
    const store =
        useContext(
            EditorContext
        );

    if (!store)
    {
        throw new Error(
            "useEditor must be used inside EditorProvider"
        );
    }

    const state =
        useSyncExternalStore(

            store.subscribe.bind(
                store
            ),

            () =>
                store.getState()

        );

    return {

        store,

        state,

        execute:
            store.execute.bind(
                store
            ),

        undo:
            store.undo.bind(
                store
            ),

        redo:
            store.redo.bind(
                store
            )

    };

}
export type EditorHook = ReturnType< typeof useEditor >;