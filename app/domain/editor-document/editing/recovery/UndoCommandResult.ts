import type { SnapshotTimeline }
from "./SnapshotTimeline";

export interface UndoCommandResult {

    success:boolean;

    timeline?:
        SnapshotTimeline;

    message?:string;

}