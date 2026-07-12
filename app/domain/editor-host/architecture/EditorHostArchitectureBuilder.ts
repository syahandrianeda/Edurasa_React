import type { EditorPresentationApi }
from "../../editor-presentation/public-api/EditorPresentationApi";

import type { EditorHostArchitecture }
from "./EditorHostArchitecture";

import type { EditorHostArchitectureResult }
from "./EditorHostArchitectureResult";

import { EditorHostIntegrationBuilder }
from "../integration/EditorHostIntegrationBuilder";

import { EditorHostLifecycleBuilder }
from "../lifecycle/EditorHostLifecycleBuilder";

import { EditorHostValidatorBuilder }
from "../validation/EditorHostValidatorBuilder";

export class EditorHostArchitectureBuilder{

    build(

        presentation:EditorPresentationApi

    ):EditorHostArchitectureResult{

        const integration=

            new EditorHostIntegrationBuilder()

                .build(presentation);

        if(

            !integration.success ||

            !integration.integration

        ){

            return{

                success:false,

                message:integration.message

            };

        }

        const runtime=

            integration
                .integration
                .bootstrap
                .api
                .provider
                .runtime;

        const lifecycle=

            new EditorHostLifecycleBuilder()

                .build(runtime);

        if(

            !lifecycle.success ||

            !lifecycle.lifecycle

        ){

            return{

                success:false,

                message:lifecycle.message

            };

        }

        const validator=

            new EditorHostValidatorBuilder()

                .build(runtime);

        const validation=

            validator.validate();

        if(!validation.success){

            return{

                success:false,

                message:validation.message

            };

        }

        const architecture:EditorHostArchitecture={

            integration:integration.integration,

            validator,

            lifecycle:lifecycle.lifecycle

        };

        return{

            success:true,

            architecture

        };

    }

}