import type { MutationReplay }
from "./MutationReplay";

import type { SnapshotTimeline }
from "../SnapshotTimeline";

export interface MutationReplayResult{

    success:boolean;

    replay?:
        MutationReplay;

    timeline?:
        SnapshotTimeline;

    message?:string;

}