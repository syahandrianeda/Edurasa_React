import type { EditorStore }
from "./EditorStore";

import type { EditorFacade }
from "./EditorFacade";

import type { EditorFacadeResult }
from "./EditorFacadeResult";

export class EditorFacadeBuilder{

    build(

        store:EditorStore

    ):EditorFacadeResult{

        const facade:EditorFacade={

            store

        };

        return{

            success:true,

            facade

        };

    }

}

// import type { EditorContext }
// from "~/domain/editor/runtime/editor-context";

// import { EditorStoreFactory }
// from "./EditorStoreFactory";

// import type { EditorFacade }
// from "./EditorFacade";

// import type { EditorFacadeResult }
// from "./EditorFacadeResult";

// export class EditorFacadeBuilder{

//     build(

//         context:EditorContext

//     ):EditorFacadeResult{

//         const store =

//             EditorStoreFactory.create(

//                 context

//             );

//         // const facade:EditorFacade={

//         //     store,

//         //     execute:(command)=>{

//         //         store.execute(command);

//         //     },

//         //     undo:()=>{

//         //         store.undo();

//         //     },

//         //     redo:()=>{

//         //         store.redo();

//         //     }

//         // };
//             const facade:EditorFacade={

//                 store

//             };
//         return{

//             success:true,

//             facade

//         };

//     }

// }

// // // import type { EditorApplication }
// // // from "~/domain/editor-document/application/EditorApplication";

// // import type { EditorApplication } from "~/domain/editor-document/application/EditorApplication";
// // import type { EditorFacade }
// // from "./EditorFacade";

// // import type { EditorFacadeResult }
// // from "./EditorFacadeResult";

// // import { EditorStoreFactory }
// // from "./EditorStoreFactory";

// // export class EditorFacadeBuilder{

// //     build(

// //         application:EditorApplication
        

// //     ):EditorFacadeResult{

// //         /**
// //          * Sementara kita memperoleh EditorContext
// //          * dari Application Runtime.
// //          *
// //          * Ketika Editor Runtime selesai dipisahkan
// //          * menjadi RichDocumentRuntime sendiri,
// //          * implementasi ini cukup diganti di sini
// //          * tanpa mengubah Bootstrap maupun React.
// //          */

// //         const context = application .runtime .engine .context;

// //         const store =

// //             EditorStoreFactory.create(

// //                 context

// //             );

// //         const facade:EditorFacade={

// //             store

// //         };

// //         return{

// //             success:true,

// //             facade

// //         };

// //     }

// // }


// // // import type { EditorContext }
// // // from "~/domain/editor/runtime/editor-context";

// // // import { EditorStoreFactory }
// // // from "./EditorStoreFactory";

// // // import type { EditorFacade }
// // // from "./EditorFacade";

// // // import type { EditorFacadeResult }
// // // from "./EditorFacadeResult";

// // // export class EditorFacadeBuilder{

// // //     build(

// // //         context:EditorContext

// // //     ):EditorFacadeResult{

// // //         const store =

// // //             EditorStoreFactory.create(

// // //                 context

// // //             );

// // //         const facade:EditorFacade={

// // //             store

// // //         };

// // //         return{

// // //             success:true,

// // //             facade

// // //         };

// // //     }

// // // }