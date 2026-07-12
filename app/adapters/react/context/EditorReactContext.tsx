import { createContext } from "react";

import type { EditorPlatform }
from "~/application/editor/bootstrap/EditorPlatform";

export const EditorReactContext= createContext<EditorPlatform|null>(null);

// import { createContext }
// from "react";

// import type { EditorHostApi }
// from "../../../domain/editor-host/public-api/EditorHostApi";

// export const EditorReactContext=

//     createContext<EditorHostApi|null>(null);