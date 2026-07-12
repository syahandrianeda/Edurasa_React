import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { QuestionCollectionAggregate }
from "./QuestionCollectionAggregate";

export class QuestionCollectionBuilder {

    build(

        questions:
            QuestionNode[]

    ): QuestionCollectionAggregate {

        return {

            collection:{

                questions

            },

            summary:{

                totalQuestions:
                    questions.length

            }

        };

    }

}