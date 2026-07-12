import type { EditorEngine }
from "./EditorEngine";

export interface EditorEnginePipelineResult{

    success:boolean;

    engine?:
        EditorEngine;

    message?:string;

}