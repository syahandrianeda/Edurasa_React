import type { EditorHostProvider }
from "../provider/EditorHostProvider";

import type { EditorHostApi }
from "./EditorHostApi";

import type { EditorHostApiResult }
from "./EditorHostApiResult";

export class EditorHostApiBuilder{

    build(

        provider:EditorHostProvider

    ):EditorHostApiResult{

        const api:EditorHostApi={

            provider,

            execute:(command)=>{

                const execution=

                    provider
                        .runtime
                        .context
                        .presentation
                        .execute(command);

                if(!execution.success){

                    return{

                        success:false,

                        message:execution.message

                    };

                }

                return{

                    success:true

                };

            }

        };

        return{

            success:true,

            api

        };

    }

}