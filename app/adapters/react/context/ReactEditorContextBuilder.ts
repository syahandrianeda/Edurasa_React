import type { EditorHostApi }
from "../../../domain/editor-host/public-api/EditorHostApi";

import type { ReactEditorContext }
from "./ReactEditorContext";

import type { ReactEditorContextResult }
from "./ReactEditorContextResult";

export class ReactEditorContextBuilder{

    build(

        host:EditorHostApi

    ):ReactEditorContextResult{

        const context:ReactEditorContext={

            host

        };

        return{

            success:true,

            context

        };

    }

}