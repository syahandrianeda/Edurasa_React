import type { EditorLifecycle } from "./EditorLifecycle";

export interface EditorLifecycleResult{

    success:boolean;

    lifecycle?:
        EditorLifecycle;

    message?:string;

}