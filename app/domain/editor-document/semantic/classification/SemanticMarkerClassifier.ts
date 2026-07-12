import type { SemanticMarkerType } from "../SemanticMarkerType";
import type { SemanticMarkerClassification } from "./SemanticMarkerClassification";

export class SemanticMarkerClassifier {
    classify( type: SemanticMarkerType ): SemanticMarkerClassification {
        switch (type) {
            case "stimulus":
            case "pertanyaan":
            case "pembahasan":
                return {
                    category:
                        "block"
                };

            case "entity":
            case "equation":
                return {
                    category:
                        "inline"
                };
        }
    }
}