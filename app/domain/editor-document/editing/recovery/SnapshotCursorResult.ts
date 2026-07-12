import type { SnapshotCursor }
from "./SnapshotCursor";

import type { SnapshotCursorSummary }
from "./SnapshotCursorSummary";

export interface SnapshotCursorResult {

    success:boolean;

    cursor?:
        SnapshotCursor;

    summary?:
        SnapshotCursorSummary;

    message?:string;

}