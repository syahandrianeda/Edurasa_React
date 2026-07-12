import { BaseQuestionMutation } from "./BaseQuestionMutation";
import { MutationTargetResolver } from "./MutationTargetResolver";
import type { QuestionMutationResult } from "./QuestionMutationResult";
import type { QuestionMutationContext } from "./QuestionMutationContext";
import type { QuestionNode } from "~/domain/editor/document/question-node";

export abstract class BaseSectionMutation<TContext extends QuestionMutationContext> extends BaseQuestionMutation {

    constructor(

        protected resolver =
            new MutationTargetResolver()

    ){

        super();

    }

    protected abstract updateQuestion(

        question:
            QuestionNode,

        context:
            TContext

    ): QuestionNode;

    mutate(

        context:
            TContext

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

        questions[
            target.target.index
        ] =

            this.updateQuestion(

                target.target.question,

                context

            );

        return{

            success:true,

            document:{

                ...context.document,

                questions

            }

        };

    }

}