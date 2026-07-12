import { BaseQuestionMutationCommand } from "./BaseQuestionMutationCommand";
import type { QuestionMutationCommandResult } from "./QuestionMutationCommandResult";
import type { UpdateQuestionMetadataContext } from "./UpdateQuestionMetadataContext";
import { UpdateQuestionMetadataMutation } from "./UpdateQuestionMetadataMutation";

export class UpdateQuestionMetadataCommand extends BaseQuestionMutationCommand {

    constructor(

        private mutation =
            new UpdateQuestionMetadataMutation()

    ){

        super();

    }

    execute(

        context:
            UpdateQuestionMetadataContext

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