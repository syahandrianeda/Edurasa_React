import type { EditorEngine }
from "./EditorEngine";

export interface EditorEngineResult{

    success:boolean;

    engine?:
        EditorEngine;

    message?:string;

}