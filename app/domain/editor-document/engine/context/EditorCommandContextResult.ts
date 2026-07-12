import type { EditorCommandContext }
from "./EditorCommandContext";

export interface EditorCommandContextResult{

    success:boolean;

    context?:
        EditorCommandContext;

    message?:string;

}