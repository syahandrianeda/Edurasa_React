import type { EditorApplication }
from "./EditorApplication";

import type { EditorCommand }
from "../engine/command/EditorCommand";

import type { EditorApplicationProcessResult }
from "./EditorApplicationProcessResult";

import { EditorCommandContextBuilder }
from "../engine/context/EditorCommandContextBuilder";

export class EditorApplicationProcessor{

    constructor(

        private readonly contextBuilder =
            new EditorCommandContextBuilder()

    ){}

    process(

        application:EditorApplication,

        command:EditorCommand

    ):EditorApplicationProcessResult{

        const context =

            this.contextBuilder.build(

                application.runtime,

                application.runtime.engine,

                command

            );

        if(

            !context.success ||

            !context.context

        ){

            return{

                success:false,

                message:context.message

            };

        }

        const execution =

            application
                .runtimeAdapter
                .execute(context.context);

        if(!execution.success){

            return{

                success:false,

                message:execution.message

            };

        }

        return{

            success:true,

            application

        };

    }

}