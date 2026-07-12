import type { ShortcutHook }
from "./ShortcutHook";

export interface ShortcutHookResult{

    success:boolean;

    hook?:ShortcutHook;

    message?:string;

}