// import { useReactEditorSession }
// from "../session/useReactEditorSession";

import { useReactEditorSession } from "../../session/useReactEditorSession";

export function useEditor(){

    const session =
        useReactEditorSession();

    return session.platform.facade;

}

// import { useMemo }
// from "react";

// import { useReactIntegration }
// from "../../integration/useReactIntegration";

// import type { EditorHook }
// from "./EditorHook";

// export function useEditor():EditorHook{

//     const integration=

//         useReactIntegration();

//     return useMemo(

//         ()=>({

//             execute:integration.api.execute

//         }),

//         [integration]

//     );

// }