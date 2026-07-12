import type { QuestionChange }
from "./QuestionChange";

import type { QuestionChangeResult }
from "./QuestionChangeResult";

export class QuestionChangeBuilder {

    build(

        change:
            QuestionChange

    ): QuestionChangeResult {

        return {

            changeSet:{

                changes:[

                    change

                ]

            }

        };

    }

}