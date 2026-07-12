import type { EditorDocument }
from "../../EditorDocument";

import type { IncrementalAnalysisRequest }
from "./IncrementalAnalysisRequest";

import type { IncrementalAnalysisResult }
from "./IncrementalAnalysisResult";

import type { SemanticDocument }
from "../../semantic/SemanticDocument";

import { QuestionAnalyzer }
from "../../analyzer/QuestionAnalyzer";

export class IncrementalAnalyzer {

    constructor(

        private analyzer =
            new QuestionAnalyzer()

    ){}

    analyze(

        request:
            IncrementalAnalysisRequest,

        document:
            EditorDocument,

        semantic:
            SemanticDocument

    ): IncrementalAnalysisResult {

        // sementara seluruh analisis masih dijalankan.
        // nanti akan benar-benar incremental.

        const result =

            this.analyzer
                .analyze(

                    document,

                    semantic

                );

        return {

            success:
                result.success,

            analysis:
                result.report
                    ? result
                    : undefined

        };

    }

}