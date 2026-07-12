import type { SnapshotTimeline } from "./SnapshotTimeline";

export interface UndoContext {
    timeline: SnapshotTimeline;
}