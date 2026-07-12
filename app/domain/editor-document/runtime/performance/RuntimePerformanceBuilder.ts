import type { RuntimePerformance }
from "./RuntimePerformance";

import type { RuntimePerformanceResult }
from "./RuntimePerformanceResult";

export class RuntimePerformanceBuilder{

    build():RuntimePerformanceResult{

        const performance:RuntimePerformance={

            executionCount:0,

            totalExecutionTime:0,

            lastExecutionTime:0

        };

        return{

            success:true,

            performance

        };

    }

}