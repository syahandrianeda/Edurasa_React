import { BaseQuestionMutation }
from "./BaseQuestionMutation";

import { MutationTargetResolver }
from "./MutationTargetResolver";

import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { QuestionMutationResult }
from "./QuestionMutationResult";

import type { UpdateAnswerContext }
from "./UpdateAnswerContext";

export class UpdateAnswerMutation
extends BaseQuestionMutation {

    constructor(

        protected resolver =
            new MutationTargetResolver()

    ){

        super();

    }

    mutate(

        context:
            UpdateAnswerContext

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

        const questions = [

            ...context.document.questions

        ];

        const question: QuestionNode = {

            ...target.target.question,

            answer:
                context.answer

        };

        questions[
            target.target.index
        ] = question;

        return{

            success:true,

            document:{

                ...context.document,

                questions

            }

        };

    }

}