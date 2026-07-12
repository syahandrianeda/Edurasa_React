import type { MutationReplayContext }
from "./MutationReplayContext";

import type { MutationReplayResult }
from "./MutationReplayResult";

export class MutationReplayProcessor{

    replay(

        context:
            MutationReplayContext

    ):MutationReplayResult{

        return{

            success:true,

            replay:{

                replayed:true

            },

            timeline:
                context.timeline

        };

    }

}