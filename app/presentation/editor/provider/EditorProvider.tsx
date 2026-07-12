import {type PropsWithChildren } from "react";
import { EditorStore } from "../../../application/editor/EditorStore";
import { EditorContext } from "./EditorContext";

interface EditorProviderProps
extends PropsWithChildren
{
    store: EditorStore;
}

export function EditorProvider({

    store,

    children

}: EditorProviderProps)
{

    return (

        <EditorContext.Provider
            value={store}
        >

            {children}

        </EditorContext.Provider>

    );

}