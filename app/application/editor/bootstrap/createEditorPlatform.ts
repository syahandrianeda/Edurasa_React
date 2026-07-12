import { EditorApplicationBuilder }
from "~/domain/editor-document/application/EditorApplicationBuilder";

import { EditorApplicationServiceBuilder }
from "~/domain/editor-document/application/service/EditorApplicationServiceBuilder";

import { EditorPresentationBootstrapBuilder }
from "~/domain/editor-presentation/bootstrap/EditorPresentationBootstrapBuilder";

import { EditorHostBootstrapBuilder }
from "~/domain/editor-host/bootstrap/EditorHostBootstrapBuilder";

import { EditorFacadeBootstrapBuilder }
from "./EditorFacadeBootstrapBuilder";

import type { EditorPlatform }
from "./EditorPlatform";

export function createEditorPlatform():EditorPlatform{

    /*
    |--------------------------------------------------
    | Application
    |--------------------------------------------------
    */

    const application=

        new EditorApplicationBuilder()
            .build();

    if(

        !application.success ||

        !application.application

    ){

        throw new Error(

            application.message ??

            "EditorApplication gagal dibuat."

        );

    }

    /*
    |--------------------------------------------------
    | Service
    |--------------------------------------------------
    */

    const service=

        new EditorApplicationServiceBuilder()
            .build(

                application.application

            );

    if(

        !service.success ||

        !service.service

    ){

        throw new Error(

            service.message ??

            "EditorApplicationService gagal dibuat."

        );

    }

    /*
    |--------------------------------------------------
    | Presentation
    |--------------------------------------------------
    */

    const presentation=

        new EditorPresentationBootstrapBuilder()
            .build(

                application.application,

                service.service

            );

    if(

        !presentation.success ||

        !presentation.bootstrap

    ){

        throw new Error(

            presentation.message ??

            "Presentation gagal dibuat."

        );

    }

    /*
    |--------------------------------------------------
    | Host
    |--------------------------------------------------
    */

    const host=

        new EditorHostBootstrapBuilder()
            .build(

                presentation
                    .bootstrap
                    .api

            );

    if(

        !host.success ||

        !host.bootstrap

    ){

        throw new Error(

            host.message ??

            "Host gagal dibuat."

        );

    }

    /*
    |--------------------------------------------------
    | Facade
    |--------------------------------------------------
    */

    const facade = new EditorFacadeBootstrapBuilder() .build( application.application, service.service );

    if(

        !facade.success ||
        

        !facade.bootstrap

    ){

        throw new Error(

            facade.message ??

            "EditorFacade gagal dibuat."

        );

    }

    /*
    |--------------------------------------------------
    | Platform
    |--------------------------------------------------
    */

    return{

        application:

            application.application,

        presentation:

            presentation
                .bootstrap
                .api,

        host:

            host
                .bootstrap
                .api,

        facade:

            facade
                .bootstrap
                .facade

    };

}