import { useContext, useMemo }
from "react";

import { EditorReactContext }
from "../context/EditorReactContext";

import type { ReactEditorSession }
from "./ReactEditorSession";

export function useReactEditorSession():ReactEditorSession{

    const platform=

        useContext(EditorReactContext);

    if(!platform){

        throw new Error(

            "EditorProvider belum dipasang."

        );

    }

    return useMemo(

        ()=>({

            platform,

            state:"ready"

        }),

        [platform]

    );

}
// import { useMemo }
// from "react";

// import { useContext }
// from "react";

// import { EditorReactContext }
// from "../context/EditorReactContext";

// import type { ReactEditorSession }
// from "./ReactEditorSession";

// export function useReactEditorSession():ReactEditorSession{

//     const host=

//         useContext(EditorReactContext);

//     if(!host){

//         throw new Error(

//             "EditorProvider belum dipasang."

//         );

//     }

//     return useMemo(

//         ()=>({

//             host,

//             state:"ready"

//         }),

//         [host]

//     );

// }