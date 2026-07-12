import type { EditorPresentationApi }
from "../../editor-presentation/public-api/EditorPresentationApi";

import type { EditorHostBootstrap }
from "./EditorHostBootstrap";

import type { EditorHostBootstrapResult }
from "./EditorHostBootstrapResult";

import { EditorHostContextBuilder }
from "../context/EditorHostContextBuilder";

import { EditorHostSessionBuilder }
from "../session/EditorHostSessionBuilder";

import { EditorHostRuntimeBuilder }
from "../runtime/EditorHostRuntimeBuilder";

import { EditorHostProviderBuilder }
from "../provider/EditorHostProviderBuilder";

import { EditorHostApiBuilder }
from "../public-api/EditorHostApiBuilder";

export class EditorHostBootstrapBuilder{

    build(

        presentation:EditorPresentationApi

    ):EditorHostBootstrapResult{

        const context=

            new EditorHostContextBuilder()

                .build(presentation);

        if(

            !context.success ||

            !context.context

        ){

            return{

                success:false,

                message:context.message

            };

        }

        const session=

            new EditorHostSessionBuilder()

                .build(context.context);

        if(

            !session.success ||

            !session.session

        ){

            return{

                success:false,

                message:session.message

            };

        }

        const runtime=

            new EditorHostRuntimeBuilder()

                .build(

                    context.context,

                    session.session

                );

        if(

            !runtime.success ||

            !runtime.runtime

        ){

            return{

                success:false,

                message:runtime.message

            };

        }

        const provider=

            new EditorHostProviderBuilder()

                .build(runtime.runtime);

        if(

            !provider.success ||

            !provider.provider

        ){

            return{

                success:false,

                message:provider.message

            };

        }

        const api=

            new EditorHostApiBuilder()

                .build(provider.provider);

        if(

            !api.success ||

            !api.api

        ){

            return{

                success:false,

                message:api.message

            };

        }

        const bootstrap:EditorHostBootstrap={

            api:api.api

        };

        return{

            success:true,

            bootstrap

        };

    }

}