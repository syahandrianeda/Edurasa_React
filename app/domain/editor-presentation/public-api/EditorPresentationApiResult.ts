import type { EditorPresentationApi }
from "./EditorPresentationApi";

export interface EditorPresentationApiResult{

    success:boolean;

    api?:EditorPresentationApi;

    message?:string;

}