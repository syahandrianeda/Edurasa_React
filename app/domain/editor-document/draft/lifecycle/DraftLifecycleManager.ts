import type { QuestionDraft } from "../QuestionDraft";
import type { DraftStatus } from "../DraftStatus";
import type { DraftTransitionResult } from "./DraftTransitionResult";
import { DraftLifecyclePolicy } from "./DraftLifecyclePolicy";

export class DraftLifecycleManager {

    constructor(

        private policy =
            new DraftLifecyclePolicy()

    ) {}

    transition( draft: QuestionDraft, targetStatus: DraftStatus ): DraftTransitionResult {

        const allowed = this.policy .canTransition( draft.status, targetStatus );

        if ( !allowed ) {

            return {

                success:false,

                message:
                    "Transisi status tidak diizinkan"

            };

        }

        draft.status = targetStatus;

        return {

            success:true

        };

    }

}