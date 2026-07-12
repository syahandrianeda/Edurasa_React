import type { EditorApplication }
from "../EditorApplication";

import type { EditorApplicationService }
from "../service/EditorApplicationService";

import type { EditorPublicApi }
from "./EditorPublicApi";

import type { EditorPublicApiResult }
from "./EditorPublicApiResult";

export class EditorPublicApiBuilder{

    build(

        application: EditorApplication,

        service: EditorApplicationService

    ): EditorPublicApiResult{

        const api:EditorPublicApi={

            application,

            service,

            execute(command){

                service.execute(command);

            },

            document(){

                return application.workspace.document;

            },

            state(){

                return application.state;

            }

        };

        return{

            success:true,

            api

        };

    }

}