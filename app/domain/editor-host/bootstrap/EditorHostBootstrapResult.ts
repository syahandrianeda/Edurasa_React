import type { EditorHostBootstrap }
from "./EditorHostBootstrap";

export interface EditorHostBootstrapResult{

    success:boolean;

    bootstrap?:EditorHostBootstrap;

    message?:string;

}