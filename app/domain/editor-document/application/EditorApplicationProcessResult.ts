import type { EditorApplication }
from "./EditorApplication";

export interface EditorApplicationProcessResult{

    success:boolean;

    application?:EditorApplication;

    message?:string;

}