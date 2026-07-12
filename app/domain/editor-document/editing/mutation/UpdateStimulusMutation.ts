import { BaseSectionMutation }
from "./BaseSectionMutation";

import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { UpdateStimulusContext }
from "./UpdateStimulusContext";

export class UpdateStimulusMutation
extends BaseSectionMutation<UpdateStimulusContext>{

    protected updateQuestion(

        question:
            QuestionNode,

        context:
            UpdateStimulusContext

    ): QuestionNode {

        return{

            ...question,

            stimulus:
                context.stimulus

        };

    }

}