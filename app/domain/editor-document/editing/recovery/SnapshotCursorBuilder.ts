import type { SnapshotCursor }
from "./SnapshotCursor";

import type { SnapshotCursorResult }
from "./SnapshotCursorResult";

export class SnapshotCursorBuilder {

    build(

        currentIndex:number,

        totalSnapshots:number

    ): SnapshotCursorResult{

        if(

            currentIndex < 0
            ||

            currentIndex >= totalSnapshots

        ){

            return{

                success:false,

                message:
                    "Snapshot cursor tidak valid"

            };

        }
        const hasPrevious = currentIndex > 0;

        const hasNext = currentIndex < totalSnapshots - 1;

        const cursor: SnapshotCursor = {
            currentIndex,
            hasPrevious,
            hasNext
        };

        return{

            success:true,

            cursor,
            summary:{

                currentIndex,

                hasPrevious,

                hasNext

            }

        };

    }

}