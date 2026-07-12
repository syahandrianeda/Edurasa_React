import { BaseQuestionMutationCommand }
from "./BaseQuestionMutationCommand";

import { UpdateStimulusMutation }
from "./UpdateStimulusMutation";

import type { UpdateStimulusContext }
from "./UpdateStimulusContext";

import type { QuestionMutationCommandResult }
from "./QuestionMutationCommandResult";

export class UpdateStimulusCommand
extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdateStimulusMutation()

    ){

        super();

    }

    execute(

        context:
            UpdateStimulusContext

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