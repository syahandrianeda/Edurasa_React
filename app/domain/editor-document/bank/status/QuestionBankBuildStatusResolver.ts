import type { QuestionBankValidationResult }
from "../validation/QuestionBankValidationResult";

import type { QuestionBankBuildStatusResult }
from "./QuestionBankBuildStatusResult";

export class QuestionBankBuildStatusResolver {

    resolve(

        validation:
            QuestionBankValidationResult

    ): QuestionBankBuildStatusResult {

        if (

            validation.valid

        ) {

            return {

                status:"valid"

            };

        }

        return {

            status:"invalid",

            message:
                "Question Bank belum memenuhi validasi"

        };

    }

}