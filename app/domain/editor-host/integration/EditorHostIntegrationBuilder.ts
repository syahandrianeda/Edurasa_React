import type { EditorPresentationApi }
from "../../editor-presentation/public-api/EditorPresentationApi";

import type { EditorHostIntegration }
from "./EditorHostIntegration";

import type { EditorHostIntegrationResult }
from "./EditorHostIntegrationResult";

import { EditorHostBootstrapBuilder }
from "../bootstrap/EditorHostBootstrapBuilder";

export class EditorHostIntegrationBuilder{

    constructor(

        private readonly bootstrapBuilder=

            new EditorHostBootstrapBuilder()

    ){}

    build(

        presentation:EditorPresentationApi

    ):EditorHostIntegrationResult{

        const bootstrap=

            this.bootstrapBuilder.build(

                presentation

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

        const integration:EditorHostIntegration={

            bootstrap:bootstrap.bootstrap

        };

        return{

            success:true,

            integration

        };

    }

}