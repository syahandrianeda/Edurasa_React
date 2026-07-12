import type { EditorRuntime }
from "./EditorRuntime";

export interface EditorRuntimeResult{

    success:boolean;

    runtime?:
        EditorRuntime;

    message?:string;

}