import { BaseQuestionMutationCommand }
from "./BaseQuestionMutationCommand";

import { UpdatePertanyaanMutation }
from "./UpdatePertanyaanMutation";

import type { UpdatePertanyaanContext }
from "./UpdatePertanyaanContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export class UpdatePertanyaanCommand
extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdatePertanyaanMutation()

    ){

        super();

    }

    execute(

        context:
            UpdatePertanyaanContext

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