import { BaseTimelineNavigationCommand }
from "./navigation/BaseTimelineNavigationCommand";

import type { TimelineNavigationContext }
from "./navigation/TimelineNavigationContext";

export class RedoCommand
extends BaseTimelineNavigationCommand {

    protected canNavigate(

        context:
            TimelineNavigationContext

    ): boolean {

        return context
            .timeline
            .cursor
            .hasNext;

    }

    protected nextIndex(

        currentIndex:number

    ): number {

        return currentIndex + 1;

    }

    protected errorMessage(): string {

        return "Tidak ada snapshot berikutnya";

    }

}


// import type { RedoContext }
// from "./RedoContext";

// import type { RedoCommandResult }
// from "./RedoCommandResult";

// export class RedoCommand {

//     execute(

//         context:
//             RedoContext

//     ): RedoCommandResult {

//         const {

//             timeline

//         } = context;

//         if(

//             !timeline.cursor.hasNext

//         ){

//             return{

//                 success:false,

//                 message:
//                     "Tidak ada snapshot berikutnya"

//             };

//         }

//         return{

//             success:true,

//             timeline:{

//                 ...timeline,

//                 cursor:{

//                     ...timeline.cursor,

//                     currentIndex:

//                         timeline.cursor.currentIndex + 1,

//                     hasPrevious:true,

//                     hasNext:

//                         timeline.cursor.currentIndex + 1
//                         <
//                         timeline.snapshots.length - 1

//                 }

//             }

//         };

//     }

// }