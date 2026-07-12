import type { ReactEditorContext }
from "./ReactEditorContext";

export interface ReactEditorContextResult{

    success:boolean;

    context?:ReactEditorContext;

    message?:string;

}