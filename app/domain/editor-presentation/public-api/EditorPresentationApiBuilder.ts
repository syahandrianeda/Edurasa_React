import type { EditorPresentationRuntime }
from "../runtime/EditorPresentationRuntime";

import type { EditorPresentationApi }
from "./EditorPresentationApi";

import type { EditorPresentationApiResult }
from "./EditorPresentationApiResult";

export class EditorPresentationApiBuilder{

    build(

        runtime:EditorPresentationRuntime

    ):EditorPresentationApiResult{

        const api:EditorPresentationApi={

            runtime,

            execute:(command)=>{

                const execution=

                    runtime
                        .dispatcher
                        .dispatch(command);

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