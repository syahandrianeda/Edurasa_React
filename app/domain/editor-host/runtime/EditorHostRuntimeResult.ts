import type { EditorHostRuntime }
from "./EditorHostRuntime";

export interface EditorHostRuntimeResult{

    success:boolean;

    runtime?:EditorHostRuntime;

    message?:string;

}