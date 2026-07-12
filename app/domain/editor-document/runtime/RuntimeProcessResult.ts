import type { EditorRuntime }
from "./EditorRuntime";

export interface RuntimeProcessResult{

    success:boolean;

    runtime?:EditorRuntime;

    message?:string;

}