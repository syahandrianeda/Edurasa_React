import type { EditorHostApi }
from "./EditorHostApi";

export interface EditorHostApiResult{

    success:boolean;

    api?:EditorHostApi;

    message?:string;

}