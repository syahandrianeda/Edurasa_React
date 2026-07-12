import type { PropsWithChildren }
from "react";

import type { EditorHostApi }
from "~/domain/editor-host/public-api/EditorHostApi";

import { EditorProvider }
from "../provider/EditorProvider";

import type { EditorPlatform }
from "~/application/editor/bootstrap/EditorPlatform";

export interface ReactCompositionRootProps
    extends PropsWithChildren{

    platform:EditorPlatform;

}
// export interface ReactCompositionRootProps
//     extends PropsWithChildren{

//     host:EditorHostApi;

// }

export function ReactCompositionRoot(

    props:ReactCompositionRootProps

){

    return(

        <EditorProvider

            // host={props.host}
            platform={props.platform}

        >

            {props.children}

        </EditorProvider>

    );

}