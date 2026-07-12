import type { EditorPresentationContext }
from "../context/EditorPresentationContext";

import type { EditorPresentationSession }
from "./EditorPresentationSession";

import type { EditorPresentationSessionResult }
from "./EditorPresentationSessionResult";

export class EditorPresentationSessionBuilder{

    build(

        context:EditorPresentationContext

    ):EditorPresentationSessionResult{

        const session:EditorPresentationSession={

            id:crypto.randomUUID(),

            context

        };

        return{

            success:true,

            session

        };

    }

}