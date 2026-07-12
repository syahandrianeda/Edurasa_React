import type { EditorApplication }
from "~/domain/editor-document/application/EditorApplication";

import type { EditorApplicationService }
from "~/domain/editor-document/application/service/EditorApplicationService";

import { EditorStore }
from "./EditorStore";

export class EditorStoreFactory{

    static create(

        application:EditorApplication,

        service:EditorApplicationService

    ):EditorStore{

        return new EditorStore(

            application,

            service

        );

    }

}

// import type { EditorContext } from "~/domain/editor/runtime/editor-context";
// import { EditorStore } from "./EditorStore";
// import { CommandBus } from "~/domain/editor/runtime/command/CommandBus";

// export class EditorStoreFactory {

//     static create(
//         context:
//             EditorContext
//     ): EditorStore {

//         const commandBus =
//             new CommandBus(
//                 context
//             );

//         return new EditorStore(

//             context.state,

//             commandBus

//         );

//     }

// }