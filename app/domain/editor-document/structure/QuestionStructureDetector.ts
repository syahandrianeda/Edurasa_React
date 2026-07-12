import type { SemanticDocument } from "../semantic/SemanticDocument";
import type { SemanticMarker } from "../semantic/SemanticMarker";
import type { StructureDetectionResult } from "./StructureDetectionResult";
import type { QuestionStructure } from "./QuestionStructure";

export class QuestionStructureDetector {

    detect(
        document:
            SemanticDocument
    ): StructureDetectionResult {

        const structures:
            QuestionStructure[]
            = [];

        let currentStimulus:
            SemanticMarker
            | undefined;

        for (
            const marker
            of document.markers
        ) {

            if (
                marker.type ===
                "stimulus"
            ) {

                currentStimulus =
                    marker;

                continue;

            }

            if (
                marker.type ===
                "pertanyaan"
            ) {

                structures.push({

                    stimulus:
                        currentStimulus,

                    pertanyaan:
                        marker,

                    opsi: []

                });

            }

        }

        return {

            structures

        };

    }

}