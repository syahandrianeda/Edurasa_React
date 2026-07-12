import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

export interface EditorHostProvider{

    readonly runtime:EditorHostRuntime;

}