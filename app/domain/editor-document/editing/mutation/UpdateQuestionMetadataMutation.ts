import { BaseQuestionMutation }
from "./BaseQuestionMutation";

import type { QuestionMutationResult }
from "./QuestionMutationResult";

import type { UpdateQuestionMetadataContext }
from "./UpdateQuestionMetadataContext";

import { MutationTargetResolver }
from "./MutationTargetResolver";

export class UpdateQuestionMetadataMutation
extends BaseQuestionMutation {

    constructor(

        private resolver =
            new MutationTargetResolver()

    ){

        super();

    }

    mutate(

        context:
            UpdateQuestionMetadataContext

    ): QuestionMutationResult {

        const target =

            this.resolver
                .resolve(

                    context.document,

                    context.questionId

                );

        if(

            !target.success
            ||
            !target.target

        ){

            return{

                success:false,

                message:
                    target.message

            };

        }

        const questions =

            [

                ...context
                    .document
                    .questions

            ];

        questions[
            target.target.index
        ] = {

            ...target.target.question,

            metadata:
                context.metadata

        };

        return{

            success:true,

            document:{

                ...context.document,

                questions

            }

        };

    }

}