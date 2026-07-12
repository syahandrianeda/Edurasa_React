import type { JSX }
from "react";

import { EditorReactContext }
from "../context/EditorReactContext";

import type { EditorProviderProps }
from "./EditorProviderProps";

export function EditorProvider(

    props:EditorProviderProps

):JSX.Element{

    return(

        <EditorReactContext.Provider

            // value={props.host}
            value={props.platform}

        >

            {props.children}

        </EditorReactContext.Provider>

    );

}