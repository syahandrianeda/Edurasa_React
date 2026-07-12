import type { EditorApplication }
from "../../editor-document/application/EditorApplication";

import type { EditorPresentationContext }
from "./EditorPresentationContext";

import type { EditorPresentationContextResult }
from "./EditorPresentationContextResult";

export class EditorPresentationContextBuilder{

    build(

        application:EditorApplication

    ):EditorPresentationContextResult{

        const context:EditorPresentationContext={

            application

        };

        return{

            success:true,

            context

        };

    }

}