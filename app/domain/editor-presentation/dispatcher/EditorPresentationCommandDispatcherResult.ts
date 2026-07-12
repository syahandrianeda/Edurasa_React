import type { EditorPresentationCommandDispatcher }
from "./EditorPresentationCommandDispatcher";

export interface EditorPresentationCommandDispatcherResult{

    success:boolean;

    dispatcher?:EditorPresentationCommandDispatcher;

    message?:string;

}