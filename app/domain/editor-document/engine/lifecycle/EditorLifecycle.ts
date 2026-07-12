import type { EditorLifecycleState }
from "./EditorLifecycleState";

export interface EditorLifecycle{

    current:
        EditorLifecycleState;

    previous?:
        EditorLifecycleState;

}