import type { EditorDocument }
from "../../EditorDocument";

import type { EditorWorkspaceState }
from "./EditorWorkspaceState";

export interface EditorWorkspace{

    readonly document: EditorDocument;

    readonly state: EditorWorkspaceState;

}