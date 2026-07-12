import type { RuntimeExecutionContext }
from "./context/RuntimeExecutionContext";

import type { RuntimeProcessResult }
from "./RuntimeProcessResult";

import { EditorEngineProcessor }
from "../engine/EditorEngineProcessor";

export class RuntimeProcessor{

    constructor(

        private readonly engineProcessor=

            new EditorEngineProcessor()

    ){}

    process(

        context:RuntimeExecutionContext

    ):RuntimeProcessResult{

        const runtime=context.runtime;

        if(runtime.state==="stopped"){

            return{

                success:false,

                message:"Runtime telah dihentikan."

            };

        }

        const engineResult=

            this.engineProcessor.process({

                engine:runtime.engine,

                command:context.command

            });

        if(!engineResult.success || !engineResult.engine){

            return{

                success:false,

                message:engineResult.message

            };

        }

        return{

            success:true,

            runtime:{

                ...runtime,

                engine:engineResult.engine

            }

        };

    }

}