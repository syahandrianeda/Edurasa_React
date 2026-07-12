import type { SelectionHook }
from "./SelectionHook";

export interface SelectionHookResult<TSelection = unknown>{

    success:boolean;

    hook?:SelectionHook<TSelection>;

    message?:string;

}