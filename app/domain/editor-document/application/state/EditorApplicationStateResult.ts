import type { EditorApplication }
from "../EditorApplication";

export interface EditorApplicationStateResult{

    success:boolean;

    application?:EditorApplication;

    message?:string;

}