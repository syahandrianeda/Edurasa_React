import type { SnapshotCollection }
from "./SnapshotCollection";

import type { SnapshotCollectionSummary }
from "./SnapshotCollectionSummary";

export interface SnapshotManagerResult {

    success:boolean;

    collection?:
        SnapshotCollection;

    summary?:
        SnapshotCollectionSummary;

    message?:string;

}