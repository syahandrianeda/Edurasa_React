import type { EditorCommand }
from "./EditorCommand";

import type { EditorCommandHandler }
from "./EditorCommandHandler";

import type { EditorCommandResult }
from "./EditorCommandResult";

export class EditorCommandBus{

    private handlers =

        new Map<

            string,

            EditorCommandHandler

        >();

    register(

        type:string,

        handler:
            EditorCommandHandler

    ):void{

        this.handlers.set(

            type,

            handler

        );

    }

    dispatch(

        command:
            EditorCommand

    ):EditorCommandResult{

        const handler =

            this.handlers.get(

                command.type

            );

        if(

            !handler

        ){

            return{

                success:false,

                message:
                    "Command handler tidak ditemukan"

            };

        }

        return handler.handle(

            command

        );

    }

}