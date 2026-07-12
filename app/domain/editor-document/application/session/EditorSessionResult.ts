import type { EditorSession }
from "./EditorSession";

export interface EditorSessionResult{

    success:boolean;

    session?:EditorSession;

    message?:string;

}