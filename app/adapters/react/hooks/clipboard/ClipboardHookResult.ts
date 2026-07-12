import type { ClipboardHook }
from "./ClipboardHook";

export interface ClipboardHookResult<TClipboard = unknown>{

    success:boolean;

    hook?:ClipboardHook<TClipboard>;

    message?:string;

}