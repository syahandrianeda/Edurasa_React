import type { AnalysisResult }
from "../../analyzer/AnalysisResult";

export interface IncrementalAnalysisResult {

    success:boolean;

    analysis?:
        AnalysisResult;

}