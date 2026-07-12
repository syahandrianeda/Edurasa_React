import type { SemanticMarker } from "../SemanticMarker";
import { SemanticMarkerClassifier } from "./SemanticMarkerClassifier";

export class BlockMarkerGuard {
    constructor( private classifier = new SemanticMarkerClassifier() ) {}

    isBlock( marker: SemanticMarker ): boolean {
        return (
            this.classifier .classify( marker.type ) .category === "block" );

    }

}