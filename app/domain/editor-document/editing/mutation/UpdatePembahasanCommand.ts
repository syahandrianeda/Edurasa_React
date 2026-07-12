import { BaseQuestionMutationCommand }
from "./BaseQuestionMutationCommand";

import { UpdatePembahasanMutation }
from "./UpdatePembahasanMutation";

import type { UpdatePembahasanContext }
from "./UpdatePembahasanContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export class UpdatePembahasanCommand
extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdatePembahasanMutation()

    ){

        super();

    }

    execute(

        context:
            UpdatePembahasanContext

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