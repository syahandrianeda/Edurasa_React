import type { EditorPresentationApi }
from "../../editor-presentation/public-api/EditorPresentationApi";

import type { EditorHostContext }
from "./EditorHostContext";

import type { EditorHostContextResult }
from "./EditorHostContextResult";

export class EditorHostContextBuilder{

    build(

        presentation:EditorPresentationApi

    ):EditorHostContextResult{

        const context:EditorHostContext={

            presentation

        };

        return{

            success:true,

            context

        };

    }

}