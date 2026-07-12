import type { QuestionBankDocument }
from "~/domain/editor/document/question-bank-document";

import type { MutationTarget }
from "./MutationTarget";

import type { MutationTargetResult }
from "./MutationTargetResult";

export class MutationTargetResolver {

    resolve(

        document:
            QuestionBankDocument,

        questionId:
            string

    ): MutationTargetResult {

        const index =

            document.questions.findIndex(

                question =>

                    question.id
                    ===
                    questionId

            );

        if (

            index
            <
            0

        ) {

            return {

                success:false,

                message:
                    "Question tidak ditemukan"

            };

        }

        const target:
            MutationTarget = {

            question:

                document
                    .questions[index],

            index

        };

        return {

            success:true,

            target

        };

    }

}   