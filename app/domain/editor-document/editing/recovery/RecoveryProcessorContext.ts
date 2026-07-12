import type { SnapshotTimeline }
from "./SnapshotTimeline";

import type { RecoveryAction }
from "./RecoveryAction";

export interface RecoveryProcessorContext{

    action:
        RecoveryAction;

    timeline:
        SnapshotTimeline;

}