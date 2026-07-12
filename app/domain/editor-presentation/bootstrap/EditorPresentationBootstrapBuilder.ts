import type { EditorApplication }
from "../../editor-document/application/EditorApplication";

import type { EditorApplicationService }
from "../../editor-document/application/service/EditorApplicationService";

import type { EditorPresentationBootstrap }
from "./EditorPresentationBootstrap";

import type { EditorPresentationBootstrapResult }
from "./EditorPresentationBootstrapResult";

import { EditorPresentationContextBuilder }
from "../context/EditorPresentationContextBuilder";

import { EditorPresentationSessionBuilder }
from "../session/EditorPresentationSessionBuilder";

import { EditorPresentationStoreBuilder }
from "../store/EditorPresentationStoreBuilder";

import { EditorPresentationControllerBuilder }
from "../controller/EditorPresentationControllerBuilder";

import { EditorPresentationCommandDispatcherBuilder }
from "../dispatcher/EditorPresentationCommandDispatcherBuilder";

import { EditorPresentationStateSynchronizerBuilder }
from "../synchronizer/EditorPresentationStateSynchronizerBuilder";

import { EditorPresentationRuntimeBuilder }
from "../runtime/EditorPresentationRuntimeBuilder";

import { EditorPresentationApiBuilder }
from "../public-api/EditorPresentationApiBuilder";

export class EditorPresentationBootstrapBuilder{

    build(

        application:EditorApplication,

        service:EditorApplicationService

    ):EditorPresentationBootstrapResult{

        const context =
            new EditorPresentationContextBuilder().build(application);

        if(!context.success || !context.context){

            return{

                success:false,

                message:context.message

            };

        }

        const session =
            new EditorPresentationSessionBuilder().build(context.context);

        if(!session.success || !session.session){

            return{

                success:false,

                message:session.message

            };

        }

        const store =
            new EditorPresentationStoreBuilder().build(

                context.context,

                session.session

            );

        if(!store.success || !store.store){

            return{

                success:false,

                message:store.message

            };

        }

        const controller =
            new EditorPresentationControllerBuilder().build(

                store.store,

                service

            );

        if(!controller.success || !controller.controller){

            return{

                success:false,

                message:controller.message

            };

        }

        const dispatcher =
            new EditorPresentationCommandDispatcherBuilder().build(

                controller.controller

            );

        if(!dispatcher.success || !dispatcher.dispatcher){

            return{

                success:false,

                message:dispatcher.message

            };

        }

        const synchronizer =
            new EditorPresentationStateSynchronizerBuilder().build(

                store.store

            );

        if(!synchronizer.success || !synchronizer.synchronizer){

            return{

                success:false,

                message:synchronizer.message

            };

        }

        const runtime =
            new EditorPresentationRuntimeBuilder().build(

                context.context,

                session.session,

                store.store,

                controller.controller,

                dispatcher.dispatcher,

                synchronizer.synchronizer

            );

        if(!runtime.success || !runtime.runtime){

            return{

                success:false,

                message:runtime.message

            };

        }

        const api =
            new EditorPresentationApiBuilder().build(

                runtime.runtime

            );

        if(!api.success || !api.api){

            return{

                success:false,

                message:api.message

            };

        }

        const bootstrap:EditorPresentationBootstrap={

            api:api.api

        };

        return{

            success:true,

            bootstrap

        };

    }

}