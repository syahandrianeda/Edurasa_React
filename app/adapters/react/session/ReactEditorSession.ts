import type { EditorPlatform }
from "~/application/editor/bootstrap/EditorPlatform";
import type { ReactEditorSessionState } from "./ReactEditorSessionState";

export interface ReactEditorSession{

    readonly platform:EditorPlatform;

    // readonly state:"ready";
    readonly state:ReactEditorSessionState;

}


// import type { EditorHostApi }
// from "../../../domain/editor-host/public-api/EditorHostApi";

// import type { ReactEditorSessionState }
// from "./ReactEditorSessionState";

// export interface ReactEditorSession{

//     readonly host:EditorHostApi;

//     readonly state:ReactEditorSessionState;

// }
