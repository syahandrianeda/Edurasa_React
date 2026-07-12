import type { EditorPresentationRuntime }
from "./EditorPresentationRuntime";

export interface EditorPresentationRuntimeResult{

    success:boolean;

    runtime?:EditorPresentationRuntime;

    message?:string;

}