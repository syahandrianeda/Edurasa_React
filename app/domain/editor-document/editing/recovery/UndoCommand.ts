import { BaseTimelineNavigationCommand } from "./navigation/BaseTimelineNavigationCommand";
import type { TimelineNavigationContext } from "./navigation/TimelineNavigationContext";

export class UndoCommand extends BaseTimelineNavigationCommand {

    protected canNavigate(

        context:
            TimelineNavigationContext

    ): boolean {

        return context
            .timeline
            .cursor
            .hasPrevious;

    }

    protected nextIndex(

        currentIndex:number

    ): number {

        return currentIndex - 1;

    }

    protected errorMessage(): string {

        return "Tidak ada snapshot sebelumnya";

    }

}



// import type { UndoContext } from "./UndoContext";
// import type { UndoCommandResult } from "./UndoCommandResult";

// export class UndoCommand {

//     execute(

//         context:
//             UndoContext

//     ): UndoCommandResult {

//         const {

//             timeline

//         } = context;

//         if(

//             !timeline.cursor.currentIndex

//         ){

//             return{

//                 success:false,

//                 message:
//                     "Tidak ada snapshot sebelumnya"

//             };

//         }

//         return{

//             success:true,

//             timeline:{

//                 ...timeline,

//                 cursor:{

//                     ...timeline.cursor,

//                     currentIndex:

//                         timeline.cursor.currentIndex - 1

//                 }

//             }

//         };

//     }

// }