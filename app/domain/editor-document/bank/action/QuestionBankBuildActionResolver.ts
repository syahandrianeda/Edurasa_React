import type { QuestionBankBuildStatusResult } from "../status/QuestionBankBuildStatusResult";
import type { QuestionBankBuildActionResult } from "./QuestionBankBuildActionResult";

export class QuestionBankBuildActionResolver {

    resolve(
        status: QuestionBankBuildStatusResult
    ): QuestionBankBuildActionResult {

        switch ( status.status ) {

            case "valid":
                return {
                    actions:[
                        "save"
                    ]
                };

            case "warning":
                return {
                    actions:[
                        "review",
                        "save"
                    ]
                };

            default:
                return {
                    actions:[
                        "review",
                        "abort"
                    ]
                };
        }
    }
}