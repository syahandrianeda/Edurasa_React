import { BaseSectionMutation }
from "./BaseSectionMutation";

import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { UpdatePertanyaanContext }
from "./UpdatePertanyaanContext";

export class UpdatePertanyaanMutation
extends BaseSectionMutation<UpdatePertanyaanContext>{

    protected updateQuestion(

        question:
            QuestionNode,

        context:
            UpdatePertanyaanContext

    ): QuestionNode {

        return{

            ...question,

            pertanyaan:
                context.pertanyaan

        };

    }

}

// import { BaseQuestionMutation }
// from "./BaseQuestionMutation";

// import { MutationTargetResolver }
// from "./MutationTargetResolver";

// import type { QuestionMutationResult }
// from "./QuestionMutationResult";

// import type { UpdatePertanyaanContext }
// from "./UpdatePertanyaanContext";

// export class UpdatePertanyaanMutation
// extends BaseQuestionMutation {

//     constructor(

//         private resolver =
//             new MutationTargetResolver()

//     ){

//         super();

//     }

//     mutate(

//         context:
//             UpdatePertanyaanContext

//     ): QuestionMutationResult {

//         const target =

//             this.resolver.resolve(

//                 context.document,

//                 context.questionId

//             );

//         if(

//             !target.success
//             ||
//             !target.target

//         ){

//             return{

//                 success:false,

//                 message:
//                     target.message

//             };

//         }

//         const questions = [

//             ...context.document.questions

//         ];

//         questions[
//             target.target.index
//         ] = {

//             ...target.target.question,

//             pertanyaan:
//                 context.pertanyaan

//         };

//         return{

//             success:true,

//             document:{

//                 ...context.document,

//                 questions

//             }

//         };

//     }

// }