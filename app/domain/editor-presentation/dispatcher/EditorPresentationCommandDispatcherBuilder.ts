import type { EditorPresentationController }
from "../controller/EditorPresentationController";

import type { EditorPresentationCommandDispatcher }
from "./EditorPresentationCommandDispatcher";

import type { EditorPresentationCommandDispatcherResult }
from "./EditorPresentationCommandDispatcherResult";

export class EditorPresentationCommandDispatcherBuilder{

    build(

        controller:EditorPresentationController

    ):EditorPresentationCommandDispatcherResult{

        const dispatcher:EditorPresentationCommandDispatcher={

            controller,

            dispatch:(command)=>{

                const execution=

                    controller.execute(command);

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

            dispatcher

        };

    }

}