import type { EditorFacadeBootstrap }
from "./EditorFacadeBootstrap";

export interface EditorFacadeBootstrapResult{

    readonly success:boolean;

    readonly bootstrap?:EditorFacadeBootstrap;

    readonly message?:string;

}