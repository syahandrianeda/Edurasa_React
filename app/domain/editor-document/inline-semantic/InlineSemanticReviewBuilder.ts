// import type { InlineSemanticCollection }
// from "../../inline-semantic/InlineSemanticCollection";

import type { InlineSemanticCollection } from "./InlineSemanticCollection";
import type { InlineSemanticReview } from "./InlineSemanticReview";
import type { InlineSemanticReviewResult } from "./InlineSemanticReviewResult";

// import type { InlineSemanticReview }
// from "./InlineSemanticReview";

// import type { InlineSemanticReviewResult }
// from "./InlineSemanticReviewResult";

export class InlineSemanticReviewBuilder {

    build( collection: InlineSemanticCollection ): InlineSemanticReviewResult {

        const review: InlineSemanticReview = {
                entities: collection.entities,
                equations: collection.equations,
                issues:[]
        };

        return {

            review,

            summary: {

                entityCount:
                    review.entities.length,

                equationCount:
                    review.equations.length,

                issueCount:
                    review.issues.length

            }

        };

    }

}