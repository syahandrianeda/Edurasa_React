import type { EditorHostContext }
from "./EditorHostContext";

export interface EditorHostContextResult{

    success:boolean;

    context?:EditorHostContext;

    message?:string;

}