import type { QuestionBankBuildStatusResult } from "../status/QuestionBankBuildStatusResult";
import type { QuestionBankBuildWorkflowResult } from "./QuestionBankBuildWorkflowResult";

export class QuestionBankBuildWorkflowBuilder {
    build(
        status: QuestionBankBuildStatusResult
    ): QuestionBankBuildWorkflowResult {

        return {

            workflow:{

                steps:[

                    {

                        id:"validation",

                        title:"Validasi",

                        completed:true

                    },

                    {

                        id:"build",

                        title:"Bangun Question Bank",

                        completed:
                            status.status === "valid"

                    }

                ]

            }

        };

    }

}