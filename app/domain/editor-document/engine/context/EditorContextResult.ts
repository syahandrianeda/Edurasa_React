import type { EditorContext }
from "./EditorContext";

export interface EditorContextResult{

    success:boolean;

    context?:
        EditorContext;

    message?:string;

}