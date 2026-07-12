import type { EditorSessionState }
from "./EditorSessionState";

export interface EditorSession{

    readonly id:string;

    readonly state:EditorSessionState;

}