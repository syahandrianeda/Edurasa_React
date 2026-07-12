import type { SemanticDocument }
from "../semantic/SemanticDocument";

import type { AnalysisResult }
from "./AnalysisResult";

import type { QuestionAnalysisReport }
from "./QuestionAnalysisReport";

import { QuestionStructureAnalysisService }
from "../structure/analysis/QuestionStructureAnalysisService";

import { InlineSemanticAnalysisService }
from "../review/inline-semantic/analysis/InlineSemanticAnalysisService";
import type { EditorDocument } from "../EditorDocument";
import { QuestionAnalysisSummaryBuilder } from "./QuestionAnalysisSummaryBuilder";
import { AnalysisStatusResolver } from "./status/AnalysisStatusResolver";
import { AnalysisRecommendationBuilder } from "./recommendation/AnalysisRecommendationBuilder";
import { AnalysisActionResolver } from "./action/AnalysisActionResolver";
import { AnalysisWorkflowBuilder } from "./workflow/AnalysisWorkflowBuilder";
import { AnalysisPipelineBuilder } from "./pipeline/AnalysisPipelineBuilder";

export class QuestionAnalyzer {

    constructor(

        private structureAnalysis = new QuestionStructureAnalysisService(),

        private semanticAnalysis = new InlineSemanticAnalysisService(),
        private summaryBuilder = new QuestionAnalysisSummaryBuilder(),
        private statusResolver = new AnalysisStatusResolver(),
        private recommendationBuilder = new AnalysisRecommendationBuilder(),
        private actionResolver = new AnalysisActionResolver(),
        private workflowBuilder = new AnalysisWorkflowBuilder(),
        private pipelineBuilder = new AnalysisPipelineBuilder()

    ) {}
    
    analyze( document: EditorDocument, semantic: SemanticDocument ): AnalysisResult{

        const structure = this.structureAnalysis .analyze( semantic );
        const semanticResult = this.semanticAnalysis .analyze( semantic.markers, document );
        const report: QuestionAnalysisReport = { structure, semantic:semanticResult };
        const summary = this.summaryBuilder .build( report );
        const status = this.statusResolver .resolve( report );
        const recommendation = this.recommendationBuilder .build( report );
        const actions = this.actionResolver .resolve( status );
        const workflow = this.workflowBuilder .build( actions );
        const pipeline = this.pipelineBuilder .build( workflow );
        return {
            success:status.status !== "invalid",
            report,
            summary,
            status,
            recommendation,
            actions,
            workflow,
            pipeline
        };

    }

}