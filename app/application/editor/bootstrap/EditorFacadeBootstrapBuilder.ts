import type { EditorApplication }
from "~/domain/editor-document/application/EditorApplication";

import { EditorFacadeBuilder }
from "../EditorFacadeBuilder";

import type { EditorFacadeBootstrap }
from "./EditorFacadeBootstrap";

import type { EditorFacadeBootstrapResult }
from "./EditorFacadeBootstrapResult";
import { EditorStoreFactory } from "../EditorStoreFactory";
import type { EditorApplicationService } from "~/domain/editor-document/application/service/EditorApplicationService";

export class EditorFacadeBootstrapBuilder{

    build(

        application:EditorApplication,
        service: EditorApplicationService

    ):EditorFacadeBootstrapResult{

        const store = EditorStoreFactory.create(
            application,
            service //<---error
        );

        const facade = new EditorFacadeBuilder().build(store);
        if(

            !facade.success ||

            !facade.facade

        ){

            return{

                success:false,

                message:facade.message

            };

        }

        const bootstrap:EditorFacadeBootstrap={

            facade:facade.facade

        };

        return{

            success:true,

            bootstrap

        };

    }

}

// import type { EditorContext }
// from "~/domain/editor/runtime/editor-context";

// import { EditorFacadeBuilder }
// from "../EditorFacadeBuilder";

// import type { EditorFacadeBootstrap }
// from "./EditorFacadeBootstrap";

// import type { EditorFacadeBootstrapResult }
// from "./EditorFacadeBootstrapResult";
// import type { EditorStore } from "../EditorStore";

// export class EditorFacadeBootstrapBuilder{

//     // build( context:EditorContext ):EditorFacadeBootstrapResult{
//     build( store:EditorStore ):EditorFacadeBootstrapResult{

//         // const facade= new EditorFacadeBuilder() .build( context );
//         const facade = new EditorFacadeBuilder() .build( store );

//         if(

//             !facade.success ||

//             !facade.facade

//         ){

//             return{

//                 success:false,

//                 message:facade.message

//             };

//         }

//         const bootstrap:EditorFacadeBootstrap={

//             facade:facade.facade

//         };

//         return{

//             success:true,

//             bootstrap

//         };

//     }

// }