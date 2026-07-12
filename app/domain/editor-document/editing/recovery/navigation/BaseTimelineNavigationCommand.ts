import type { TimelineNavigationContext }
from "./TimelineNavigationContext";

import type { TimelineNavigationResult }
from "./TimelineNavigationResult";

export abstract class BaseTimelineNavigationCommand {

    protected abstract canNavigate(

        context:
            TimelineNavigationContext

    ): boolean;

    protected abstract nextIndex(

        currentIndex:number

    ): number;

    protected abstract errorMessage():
        string;

    execute(

        context:
            TimelineNavigationContext

    ): TimelineNavigationResult {

        if(

            !this.canNavigate(

                context

            )

        ){

            return{

                success:false,

                message:

                    this.errorMessage()

            };

        }

        const {

            timeline

        } = context;

        const currentIndex =

            this.nextIndex(

                timeline
                    .cursor
                    .currentIndex

            );

        const hasPrevious =

            currentIndex > 0;

        const hasNext =

            currentIndex
            <
            timeline.snapshots.length - 1;

        return{

            success:true,

            timeline:{

                ...timeline,

                cursor:{

                    currentIndex,

                    hasPrevious,

                    hasNext

                }

            }

        };

    }

}