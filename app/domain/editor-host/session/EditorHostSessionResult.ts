import type { EditorHostSession }
from "./EditorHostSession";

export interface EditorHostSessionResult{

    success:boolean;

    session?:EditorHostSession;

    message?:string;

}