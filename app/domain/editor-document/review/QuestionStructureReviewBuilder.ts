import type { QuestionStructure }
from "../structure/QuestionStructure";

import type { QuestionStructureReview }
from "./QuestionStructureReview";

import type { QuestionStructureReviewCollection }
from "./QuestionStructureReviewCollection";

export class QuestionStructureReviewBuilder {

    build(

        structures:
            QuestionStructure[]

    ): QuestionStructureReviewCollection {

        const reviews:

            QuestionStructureReview[]

            = structures.map(

                structure => ({

                    structure,

                    status:
                        "pending",

                    comments:[]

                })

            );

        return {

            reviews,

            summary:{

                total:
                    reviews.length,

                approved:0,

                rejected:0,

                pending:
                    reviews.length

            }

        };

    }

}