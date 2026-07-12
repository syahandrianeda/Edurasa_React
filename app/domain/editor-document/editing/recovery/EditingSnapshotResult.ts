import type { EditingSnapshot }
from "./EditingSnapshot";

import type { EditingSnapshotSummary }
from "./EditingSnapshotSummary";

export interface EditingSnapshotResult {

    success:boolean;

    snapshot?:
        EditingSnapshot;

    summary?:
        EditingSnapshotSummary;

    message?:string;

}