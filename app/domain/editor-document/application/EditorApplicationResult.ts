import type { EditorApplication }
from "./EditorApplication";

export interface EditorApplicationResult{

    success:boolean;

    application?:EditorApplication;

    message?:string;

}