import type { AnalysisActionResult } from "./action/AnalysisActionResult";
import type { AnalysisPipelineResult } from "./pipeline/AnalysisPipelineResult";
import type { QuestionAnalysisReport }
from "./QuestionAnalysisReport";
import type { QuestionAnalysisSummary } from "./QuestionAnalysisSummary";
import type { AnalysisRecommendationResult } from "./recommendation/AnalysisRecommendationResult";
import type { AnalysisStatusResult } from "./status/AnalysisStatusResult";
import type { AnalysisWorkflowResult } from "./workflow/AnalysisWorkflowResult";

export interface AnalysisResult {

    success:boolean;

    report: QuestionAnalysisReport;

    summary: QuestionAnalysisSummary;

    status: AnalysisStatusResult;

    recommendation: AnalysisRecommendationResult;

    actions: AnalysisActionResult;

    workflow: AnalysisWorkflowResult;
    
    pipeline: AnalysisPipelineResult;

}