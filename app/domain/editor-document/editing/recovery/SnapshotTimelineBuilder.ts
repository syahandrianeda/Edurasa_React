import type { EditingSnapshot }
from "./EditingSnapshot";
import { SnapshotCursorBuilder } from "./SnapshotCursorBuilder";

import type { SnapshotTimeline }
from "./SnapshotTimeline";

import type { SnapshotTimelineResult }
from "./SnapshotTimelineResult";

export class SnapshotTimelineBuilder {
    constructor(
        private cursorBuilder = new SnapshotCursorBuilder()
    ){}

    build(

        snapshots:
            EditingSnapshot[],

        currentIndex =
            snapshots.length - 1

    ): SnapshotTimelineResult {
        const cursor = this.cursorBuilder.build( currentIndex, snapshots.length );

        if( !cursor.success || !cursor.cursor ){
            return{
                success:false,
                message:
                    cursor.message
            };

        }

        const timeline: SnapshotTimeline = {

            snapshots,

            cursor:
                cursor.cursor

        };

        return{
            success:true,
            timeline,
            summary:{
                totalSnapshots: snapshots.length,
                currentIndex: cursor.cursor.currentIndex,
                hasPrevious: cursor.summary!.hasPrevious,
                hasNext: cursor.summary!.hasNext
            }
        };
    }
}