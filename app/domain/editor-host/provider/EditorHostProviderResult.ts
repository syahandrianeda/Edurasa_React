import type { EditorHostProvider }
from "./EditorHostProvider";

export interface EditorHostProviderResult{

    success:boolean;

    provider?:EditorHostProvider;

    message?:string;

}