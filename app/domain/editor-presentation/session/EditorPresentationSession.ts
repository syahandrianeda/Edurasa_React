import type { EditorPresentationContext }
from "../context/EditorPresentationContext";

export interface EditorPresentationSession{

    readonly id:string;

    readonly context:EditorPresentationContext;

}