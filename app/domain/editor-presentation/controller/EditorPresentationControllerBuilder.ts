import type { EditorApplicationService }
from "../../editor-document/application/service/EditorApplicationService";

import type { EditorPresentationStore }
from "../store/EditorPresentationStore";

import type { EditorPresentationController }
from "./EditorPresentationController";

import type { EditorPresentationControllerResult }
from "./EditorPresentationControllerResult";

export class EditorPresentationControllerBuilder{

    build(

        store:EditorPresentationStore,

        service:EditorApplicationService

    ):EditorPresentationControllerResult{

        const controller:EditorPresentationController={

            store,

            execute:(command)=>{

                const execution=

                    service.execute(command);

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

            controller

        };

    }

}