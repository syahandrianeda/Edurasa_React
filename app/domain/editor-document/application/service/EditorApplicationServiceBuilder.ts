import type { EditorApplication }
from "../EditorApplication";

import type { EditorApplicationService }
from "./EditorApplicationService";

import type { EditorApplicationServiceResult }
from "./EditorApplicationServiceResult";

import { ApplicationPipelineBuilder }
from "../pipeline/ApplicationPipelineBuilder";

export class EditorApplicationServiceBuilder{

    constructor(

        private readonly pipeline =
            new ApplicationPipelineBuilder().build()

    ){}

    build(

        application: EditorApplication

    ): EditorApplicationServiceResult{

        const service:EditorApplicationService={

            application,

            execute:(command)=>{

                if(

                    !this.pipeline.success ||

                    !this.pipeline.pipeline

                ){

                    return{

                        success:false,

                        message:this.pipeline.message

                    };

                }

                return this.pipeline
                    .pipeline
                    .processor
                    .process(

                        application,

                        command

                    );

            }

        };

        return{

            success:true,

            application,

            service

        } as EditorApplicationServiceResult & {

            service: EditorApplicationService

        };

    }

}


// import type { EditorApplication }
// from "../EditorApplication";

// import type { EditorApplicationService }
// from "./EditorApplicationService";

// import type { EditorApplicationServiceResult }
// from "./EditorApplicationServiceResult";

// import { EditorCommandContextBuilder }
// from "../../engine/context/EditorCommandContextBuilder";
// import { EditorApplicationProcessor } from "../EditorApplicationProcessor";
// import { ApplicationPipelineBuilder } from "../pipeline/ApplicationPipelineBuilder";

// export class EditorApplicationServiceBuilder{
//     constructor(

//             private readonly processor = new EditorApplicationProcessor(),
//             private readonly pipeline = new ApplicationPipelineBuilder().build()

//         ){}
//     // constructor(

//     //     private readonly contextBuilder = new EditorCommandContextBuilder(),
        

//     // ){}

//     build(

//         application: EditorApplication

//     ): EditorApplicationServiceResult{

//         const service:EditorApplicationService={

//             application,
//             execute:(command)=>{

//                 // return this.processor.process(

//                 //     application,

//                 //     command

//                 // );
//                 if( !this.pipeline.success || !this.pipeline.pipeline ){
//                     return{

//                         success:false,

//                         message:this.pipeline.message

//                     };

//                 }

//                 return this.pipeline
//                     .pipeline
//                     .processor
//                     .process(

//                         application,

//                         command

//                     );

//             }
//             // execute:(command)=>{

//             //     const context =

//             //         this.contextBuilder.build(

//             //             application.runtime,

//             //             application.runtime.engine,

//             //             command

//             //         );

//             //     if(

//             //         !context.success ||

//             //         !context.context

//             //     ){

//             //         return{

//             //             success:false,

//             //             message:context.message

//             //         };

//             //     }

//             //     const execution =

//             //         application
//             //             .runtimeAdapter
//             //             .execute(context.context);

//             //     if(!execution.success){

//             //         return{

//             //             success:false,

//             //             message:execution.message

//             //         };

//             //     }

//             //     return{

//             //         success:true,

//             //         application

//             //     };

//             // }

//         };

//         return{

//             success:true,

//             application,

//             service

//         } as EditorApplicationServiceResult & { service: EditorApplicationService };

//     }

// }