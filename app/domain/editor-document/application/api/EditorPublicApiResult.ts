import type { EditorPublicApi }
from "./EditorPublicApi";

export interface EditorPublicApiResult{

    success:boolean;

    api?:EditorPublicApi;

    message?:string;

}