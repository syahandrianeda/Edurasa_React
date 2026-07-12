import type { ToolbarHook }
from "./ToolbarHook";

export interface ToolbarHookResult{

    success:boolean;

    hook?:ToolbarHook;

    message?:string;

}