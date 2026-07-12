import type { EditorPresentationSession }
from "./EditorPresentationSession";

export interface EditorPresentationSessionResult{

    success:boolean;

    session?:EditorPresentationSession;

    message?:string;

}