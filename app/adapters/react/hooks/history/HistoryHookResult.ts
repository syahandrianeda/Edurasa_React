import type { HistoryHook }
from "./HistoryHook";

export interface HistoryHookResult<THistory = unknown>{

    success:boolean;

    hook?:HistoryHook<THistory>;

    message?:string;

}