import type { EditorHostArchitecture }
from "./EditorHostArchitecture";

export interface EditorHostArchitectureResult{

    success:boolean;

    architecture?:EditorHostArchitecture;

    message?:string;

}