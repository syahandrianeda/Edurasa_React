import type { EditorHostBootstrap }
from "../bootstrap/EditorHostBootstrap";

export interface EditorHostIntegration{

    readonly bootstrap:EditorHostBootstrap;

}