import type { EditorRuntime }
from "./EditorRuntime";

export interface RuntimeExecutorResult{

    success:boolean;

    runtime?:EditorRuntime;

    message?:string;

}