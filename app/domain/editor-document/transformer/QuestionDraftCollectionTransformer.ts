import type { QuestionNode }
from "~/domain/editor/document/question-node";

import type { EditorDocument }
from "../EditorDocument";

import type { QuestionDraftCollection }
from "../draft/QuestionDraftCollection";

import { QuestionDraftTransformer }
from "./QuestionDraftTransformer";

export interface CollectionTransformResult {

    questions:
        QuestionNode[];

    failed:number;

}

export class QuestionDraftCollectionTransformer {

    constructor(

        private transformer =
            new QuestionDraftTransformer()

    ) {}

    transform(

        collection:
            QuestionDraftCollection,

        document:
            EditorDocument

    ): CollectionTransformResult {

        const questions:
            QuestionNode[]
            = [];

        let failed = 0;

        for (
            const draft
            of collection.drafts
        ) {

            const result =

                this.transformer
                    .transform(

                        draft,

                        document

                    );

            if (

                result.success
                &&
                result.question

            ) {

                questions.push(

                    result.question

                );

            }
            else {

                failed++;

            }

        }

        return {

            questions,

            failed

        };

    }

}