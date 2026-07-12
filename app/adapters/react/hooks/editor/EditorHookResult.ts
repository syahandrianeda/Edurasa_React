import type { EditorHook }
from "./EditorHook";

export interface EditorHookResult{

    success:boolean;

    hook?:EditorHook;

    message?:string;

}