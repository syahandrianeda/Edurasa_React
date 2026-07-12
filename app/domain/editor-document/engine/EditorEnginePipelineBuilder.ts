import { EditorEnginePipeline } from "./EditorEnginePipeline";

export class EditorEnginePipelineBuilder{

    build(): EditorEnginePipeline{

        return new EditorEnginePipeline();

    }

}
// export class EditorEnginePipelineBuilder{

//     build():

//         EditorEnginePipelineResult{

//         return{

//             success:true,

//             engine:

//                 undefined

//         };

//     }

//     create():

//         EditorEnginePipeline{

//         return new EditorEnginePipeline();

//     }

// }