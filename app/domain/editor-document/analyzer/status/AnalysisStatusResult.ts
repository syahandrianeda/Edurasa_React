import type { AnalysisStatus }
from "./AnalysisStatus";

import type { AnalysisStatusSummary }
from "./AnalysisStatusSummary";

export interface AnalysisStatusResult {

    status:
        AnalysisStatus;

    summary:
        AnalysisStatusSummary;

    messages:
        string[];

}