import type { RecoveryAction } from "../RecoveryAction";
import type { SnapshotTimeline } from "../SnapshotTimeline";

export interface RecoveryPipelineContext{
    action: RecoveryAction;
    timeline: SnapshotTimeline;
}