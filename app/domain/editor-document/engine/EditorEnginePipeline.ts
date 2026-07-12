import type { EditorEngine }
from "./EditorEngine";

import type { EditorCommand }
from "./command/EditorCommand";

import type { EditorEnginePipelineResult }
from "./EditorEnginePipelineResult";

import { EditorCommandContextBuilder }
from "./context/EditorCommandContextBuilder";

import { EditorEngineProcessor }
from "./EditorEngineProcessor";

export class EditorEnginePipeline{

    constructor(

        private contextBuilder =
            new EditorCommandContextBuilder(),

        private processor =
            new EditorEngineProcessor()

    ){}

    execute(

        engine:
            EditorEngine,

        command:
            EditorCommand

    ):EditorEnginePipelineResult{

        const context =

            this.contextBuilder.build(

                engine,

                command

            );

        if(

            !context.success ||

            !context.context

        ){

            return{

                success:false,

                message:
                    context.message

            };

        }

        const result =

            this.processor.process(

                context.context

            );

        if(

            !result.success ||

            !result.engine

        ){

            return{

                success:false,

                message:
                    result.message

            };

        }

        return{

            success:true,

            engine:
                result.engine

        };

    }

}