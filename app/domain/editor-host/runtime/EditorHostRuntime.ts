import type { EditorHostContext }
from "../context/EditorHostContext";

import type { EditorHostSession }
from "../session/EditorHostSession";

export interface EditorHostRuntime{

    readonly context:EditorHostContext;

    readonly session:EditorHostSession;

}