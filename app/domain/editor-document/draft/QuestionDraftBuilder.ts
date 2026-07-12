import type { QuestionDraft }
from "./QuestionDraft";

import type { QuestionDraftCollection }
from "./QuestionDraftCollection";

import type { DraftBuildResult }
from "./DraftBuildResult";

import type { QuestionStructureReviewCollection }
from "../review/QuestionStructureReviewCollection";

export class QuestionDraftBuilder {

    build(

        reviews:
            QuestionStructureReviewCollection

    ): DraftBuildResult {

        const drafts:

            QuestionDraft[]

            = reviews.reviews

                .filter(

                    review =>

                        review.status ===
                        "approved"

                )

                .map(

                    review => ({

                        id:
                            crypto
                                .randomUUID(),

                        structure:
                            review.structure,

                        status:
                            "draft"

                    })

                );

        return {

            collection:{

                drafts

            }

        };

    }

}