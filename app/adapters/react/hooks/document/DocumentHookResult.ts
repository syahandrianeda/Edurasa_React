import type { DocumentHook }
from "./DocumentHook";

export interface DocumentHookResult<TDocument = unknown>{

    success:boolean;

    hook?:DocumentHook<TDocument>;

    message?:string;

}