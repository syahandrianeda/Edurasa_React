import type { EditorApplication }
from "../../editor-document/application/EditorApplication";

import type { EditorApplicationService }
from "../../editor-document/application/service/EditorApplicationService";

import type { EditorPresentationIntegration }
from "./EditorPresentationIntegration";

import type { EditorPresentationIntegrationResult }
from "./EditorPresentationIntegrationResult";

import { EditorPresentationBootstrapBuilder }
from "../bootstrap/EditorPresentationBootstrapBuilder";

export class EditorPresentationIntegrationBuilder{

    constructor(

        private readonly bootstrapBuilder=

            new EditorPresentationBootstrapBuilder()

    ){}

    build(

        application:EditorApplication,

        service:EditorApplicationService

    ):EditorPresentationIntegrationResult{

        const bootstrap=

            this.bootstrapBuilder.build(

                application,

                service

            );

        if(

            !bootstrap.success ||

            !bootstrap.bootstrap

        ){

            return{

                success:false,

                message:bootstrap.message

            };

        }

        const integration:EditorPresentationIntegration={

            bootstrap:bootstrap.bootstrap

        };

        return{

            success:true,

            integration

        };

    }

}