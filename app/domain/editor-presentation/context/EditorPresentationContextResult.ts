import type { EditorPresentationContext }
from "./EditorPresentationContext";

export interface EditorPresentationContextResult{

    success:boolean;

    context?:EditorPresentationContext;

    message?:string;

}