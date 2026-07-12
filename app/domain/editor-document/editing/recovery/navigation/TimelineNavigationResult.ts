import type { SnapshotTimeline }
from "../SnapshotTimeline";

export interface TimelineNavigationResult {

    success:boolean;

    timeline?:
        SnapshotTimeline;

    message?:string;

}