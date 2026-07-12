import { BaseQuestionMutationCommand }
from "./BaseQuestionMutationCommand";

import { UpdateInteractionMutation }
from "./UpdateInteractionMutation";

import type { UpdateInteractionContext }
from "./UpdateInteractionContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export class UpdateInteractionCommand
extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdateInteractionMutation()

    ){

        super();

    }

    execute(

        context:
            UpdateInteractionContext

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