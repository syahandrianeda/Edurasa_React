import type { EditorRuntime } from "../../runtime/EditorRuntime";
import type { EditorEngine }
from "../EditorEngine";

import type { EditorCommand }
from "../command/EditorCommand";

import type { EditorCommandContext }
from "./EditorCommandContext";

import type { EditorCommandContextResult }
from "./EditorCommandContextResult";

export class EditorCommandContextBuilder{

    build(
        runtime: EditorRuntime,
        engine:
            EditorEngine,

        command:
            EditorCommand

    ):EditorCommandContextResult{

        return{

            success:true,

            context:{
                runtime,

                engine,

                command

            }

        };

    }

}