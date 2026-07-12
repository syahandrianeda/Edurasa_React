import type { QuestionStructureAnalysisResult }
from "../structure/analysis/QuestionStructureAnalysisResult";

import type { InlineSemanticAnalysisResult }
from "../review/inline-semantic/analysis/InlineSemanticAnalysisResult";

export interface QuestionAnalysisReport {

    structure:
        QuestionStructureAnalysisResult;

    semantic:
        InlineSemanticAnalysisResult;

}
