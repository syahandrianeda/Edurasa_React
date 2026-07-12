import type { EditorHostContext }
from "../context/EditorHostContext";

import type { EditorHostSession }
from "./EditorHostSession";

import type { EditorHostSessionResult }
from "./EditorHostSessionResult";

export class EditorHostSessionBuilder{

    build(

        context:EditorHostContext

    ):EditorHostSessionResult{

        const session:EditorHostSession={

            context,

            state:"idle"

        };

        return{

            success:true,

            session

        };

    }

}