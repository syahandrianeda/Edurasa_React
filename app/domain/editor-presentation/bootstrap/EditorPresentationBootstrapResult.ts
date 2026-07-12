import type { EditorPresentationBootstrap }
from "./EditorPresentationBootstrap";

export interface EditorPresentationBootstrapResult{

    success:boolean;

    bootstrap?:EditorPresentationBootstrap;

    message?:string;

}