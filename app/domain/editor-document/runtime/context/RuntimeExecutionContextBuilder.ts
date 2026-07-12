import type { EditorRuntime }
from "../EditorRuntime";

import type { EditorCommand }
from "../../engine/command/EditorCommand";

import type { RuntimeExecutionContext }
from "./RuntimeExecutionContext";

import type { RuntimeExecutionContextResult }
from "./RuntimeExecutionContextResult";

import type { RuntimeExecutionOptions }
from "./RuntimeExecutionOptions";

export class RuntimeExecutionContextBuilder{

    build(

        runtime:EditorRuntime,

        command:EditorCommand,

        options?:Partial<RuntimeExecutionOptions>

    ):RuntimeExecutionContextResult{

        const executionOptions:RuntimeExecutionOptions={

            batch:false,

            recoverable:true,

            trackPerformance:true,

            ...options

        };

        const context:RuntimeExecutionContext={

            runtime,

            command,

            options:executionOptions

        };

        return{

            success:true,

            context

        };

    }

}