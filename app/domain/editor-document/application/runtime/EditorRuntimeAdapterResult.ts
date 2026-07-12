import type { EditorRuntimeAdapter }
from "./EditorRuntimeAdapter";

export interface EditorRuntimeAdapterResult{

    success:boolean;

    adapter?:EditorRuntimeAdapter;

    message?:string;

}