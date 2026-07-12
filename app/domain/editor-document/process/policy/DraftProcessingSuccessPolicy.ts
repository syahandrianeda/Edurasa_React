import type { DraftProcessingPolicyResult }
from "./DraftProcessingPolicyResult";

export class DraftProcessingSuccessPolicy {

    evaluate(

        validDrafts:number,

        invalidDrafts:number,

        transformedDrafts:number

    ): DraftProcessingPolicyResult {

        if (

            invalidDrafts > 0

        ) {

            return {

                success:false,

                message:
                    "Masih terdapat draft yang tidak valid"

            };

        }

        if (

            transformedDrafts
            <
            validDrafts

        ) {

            return {

                success:false,

                message:
                    "Sebagian draft gagal ditransformasi"

            };

        }

        return {

            success:true

        };

    }

}