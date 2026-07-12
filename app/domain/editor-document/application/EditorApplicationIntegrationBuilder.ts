import type { EditorApplication }
from "./EditorApplication";

import type { EditorApplicationIntegration }
from "./EditorApplicationIntegration";

import type { EditorApplicationIntegrationResult }
from "./EditorApplicationIntegrationResult";

import { EditorApplicationServiceBuilder }
from "./service/EditorApplicationServiceBuilder";

import { EditorPublicApiBuilder }
from "./api/EditorPublicApiBuilder";

export class EditorApplicationIntegrationBuilder{

    build(

        application: EditorApplication

    ): EditorApplicationIntegrationResult{

        const service =

            new EditorApplicationServiceBuilder()

                .build(application);

        if(

            !service.success ||

            !("service" in service) ||

            !service.service

        ){

            return{

                success:false,

                message:"Application Service gagal dibuat."

            };

        }

        const api =

            new EditorPublicApiBuilder()

                .build(

                    application,

                    service.service

                );

        if(

            !api.success ||

            !api.api

        ){

            return{

                success:false,

                message:"Public API gagal dibuat."

            };

        }

        const integration:EditorApplicationIntegration={

            application,

            service:service.service,

            api:api.api

        };

        return{

            success:true,

            integration

        };

    }

}