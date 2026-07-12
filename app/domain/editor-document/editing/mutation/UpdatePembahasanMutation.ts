import { BaseSectionMutation }
from "./BaseSectionMutation";

import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { UpdatePembahasanContext }
from "./UpdatePembahasanContext";

export class UpdatePembahasanMutation
extends BaseSectionMutation<UpdatePembahasanContext>{

    protected updateQuestion(

        question:
            QuestionNode,

        context:
            UpdatePembahasanContext

    ): QuestionNode {

        return{

            ...question,

            pembahasan:
                context.pembahasan

        };

    }

}