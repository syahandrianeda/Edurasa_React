import type { EditorWorkspace }
from "./EditorWorkspace";

export interface EditorWorkspaceResult{

    success:boolean;

    workspace?:EditorWorkspace;

    message?:string;

}