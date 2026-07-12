import type { RuntimeQueue }
from "../queue/RuntimeQueue";

import type { RuntimeScheduleDecision }
from "./RuntimeScheduleDecision";

export interface RuntimeScheduler{

    schedule(

        queue:RuntimeQueue

    ):RuntimeScheduleDecision;

}   