import type { CommandHook }
from "./CommandHook";

export interface CommandHookResult{

    success:boolean;

    hook?:CommandHook;

    message?:string;

}