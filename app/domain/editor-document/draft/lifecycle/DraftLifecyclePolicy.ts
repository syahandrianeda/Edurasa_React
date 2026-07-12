import type { DraftStatus } from "../DraftStatus";

export class DraftLifecyclePolicy {

    canTransition(

        from:
            DraftStatus,

        to:
            DraftStatus

    ): boolean {

        if (

            from === "draft"
            &&
            to === "ready"

        ) {

            return true;

        }

        if (

            from === "ready"
            &&
            to === "published"

        ) {

            return true;

        }

        return false;

    }

}