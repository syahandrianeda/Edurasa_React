import type { SnapshotTimeline }
from "./SnapshotTimeline";

import type { RecoveryWorkflow }
from "./workflow/RecoveryWorkflow";

export interface RecoveryProcessorResult{

    success:boolean;

    timeline?:
        SnapshotTimeline;

    workflow?:
        RecoveryWorkflow;

    message?:string;

}