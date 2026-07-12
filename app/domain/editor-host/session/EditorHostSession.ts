import type { EditorHostContext }
from "../context/EditorHostContext";

import type { EditorHostSessionState }
from "./EditorHostSessionState";

export interface EditorHostSession{

    readonly context:EditorHostContext;

    readonly state:EditorHostSessionState;

}