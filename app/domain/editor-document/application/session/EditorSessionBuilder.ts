import type { EditorSession }
from "./EditorSession";

import type { EditorSessionResult }
from "./EditorSessionResult";

export class EditorSessionBuilder{

    build():EditorSessionResult{

        const session:EditorSession={

            id:crypto.randomUUID(),

            state:"created"

        };

        return{

            success:true,

            session

        };

    }

}   