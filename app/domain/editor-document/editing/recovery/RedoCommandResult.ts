import type { SnapshotTimeline }
from "./SnapshotTimeline";

export interface RedoCommandResult {

    success:boolean;

    timeline?:
        SnapshotTimeline;

    message?:string;

}