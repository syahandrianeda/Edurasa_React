import { createContext } from "react";
import { EditorStore } from "../../../application/editor/EditorStore";

export const EditorContext =
    createContext<
        EditorStore | null
    >(null);