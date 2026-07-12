import type { SnapshotTimeline }
from "./SnapshotTimeline";

import type { SnapshotTimelineSummary }
from "./SnapshotTimelineSummary";

export interface SnapshotTimelineResult {

    success:boolean;

    timeline?:
        SnapshotTimeline;

    summary?:
        SnapshotTimelineSummary;

    message?:string;

}