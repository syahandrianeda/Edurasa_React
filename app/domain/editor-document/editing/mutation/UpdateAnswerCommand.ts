import { BaseQuestionMutationCommand }
from "./BaseQuestionMutationCommand";

import { UpdateAnswerMutation }
from "./UpdateAnswerMutation";

import type { UpdateAnswerContext }
from "./UpdateAnswerContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export class UpdateAnswerCommand
extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdateAnswerMutation()

    ){

        super();

    }

    execute(

        context:
            UpdateAnswerContext

    ): QuestionMutationCommandResult {

        const mutation =

            this.mutation
                .mutate(

                    context

                );

        return{

            success:
                mutation.success,

            mutation,

            message:
                mutation.message

        };

    }

}