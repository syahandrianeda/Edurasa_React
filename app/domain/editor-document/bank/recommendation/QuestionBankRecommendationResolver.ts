import type { QuestionBankValidationResult } from "../validation/QuestionBankValidationResult";
import type { QuestionBankBuildStatusResult } from "../status/QuestionBankBuildStatusResult";
import type { QuestionBankRecommendationResult } from "./QuestionBankRecommendationResult";

export class QuestionBankRecommendationResolver {

    resolve(
        validation: QuestionBankValidationResult,
        status: QuestionBankBuildStatusResult
    ): QuestionBankRecommendationResult {

        const recommendations = [];

        if ( status.status === "valid" ) {

            recommendations.push({
                message: "Question Bank siap diproses ke tahap berikutnya."
            });

        }

        if ( !validation.valid ) {

            recommendations.push({
                message: "Perbaiki seluruh issue validasi sebelum melanjutkan."
            });
        }

        return {
            recommendations
        };
    }
}