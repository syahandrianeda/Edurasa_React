import type { EditorHostContext }
from "../context/EditorHostContext";

import type { EditorHostSession }
from "../session/EditorHostSession";

import type { EditorHostRuntime }
from "./EditorHostRuntime";

import type { EditorHostRuntimeResult }
from "./EditorHostRuntimeResult";

export class EditorHostRuntimeBuilder{

    build(

        context:EditorHostContext,

        session:EditorHostSession

    ):EditorHostRuntimeResult{

        const runtime:EditorHostRuntime={

            context,

            session

        };

        return{

            success:true,

            runtime

        };

    }

}