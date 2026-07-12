import type { EditorRuntime } from "../../runtime/EditorRuntime";
import { RuntimeExecutor }
from "../../runtime/RuntimeExecutor";
import type { EditorRuntimeAdapter } from "./EditorRuntimeAdapter";
import type { EditorRuntimeAdapterResult } from "./EditorRuntimeAdapterResult";

export class EditorRuntimeAdapterBuilder{

    constructor(

        private readonly executor =
            new RuntimeExecutor()

    ){}

    build(
        runtime: EditorRuntime
    ):EditorRuntimeAdapterResult{

        const adapter:EditorRuntimeAdapter={

            runtime,

            execute:(context)=>{

                const result =
                    this.executor.execute(

                        context.runtime,

                        context.command

                    );

                return{

                    success:result.success,

                    message:result.message,

                    engine: result.runtime?.engine

                };

            }

        };

        return{

            success:true,

            adapter

        };

    }

}

// import type { EditorRuntime }
// from "../../runtime/EditorRuntime";
// import { RuntimeExecutor } from "../../runtime/RuntimeExecutor";

// import type { EditorRuntimeAdapter }
// from "./EditorRuntimeAdapter";

// import type { EditorRuntimeAdapterResult }
// from "./EditorRuntimeAdapterResult";

// export class EditorRuntimeAdapterBuilder{
//     constructor(

//         private executor = new RuntimeExecutor()

//     ){}

//     build(
//         runtime: EditorRuntime
//     ):EditorRuntimeAdapterResult{

//         const adapter:EditorRuntimeAdapter={

//             runtime,

//             // execute(context){

//             //     return runtime.processor.process(context);

//             // }
//             execute(context){

//                 return this.executor.execute(

//                     context.runtime,

//                     context.command

//                 );

//             }

//         };

//         return{

//             success:true,

//             adapter

//         };

//     }

// }