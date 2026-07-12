import type { EditingSnapshot } from "./EditingSnapshot";
import type { SnapshotCursor } from "./SnapshotCursor";

export interface SnapshotTimeline {

    snapshots:
        EditingSnapshot[];

    cursor:
        SnapshotCursor;

}