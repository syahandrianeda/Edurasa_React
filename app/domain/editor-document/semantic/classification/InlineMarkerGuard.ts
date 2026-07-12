import type { SemanticMarker } from "../SemanticMarker";
import { SemanticMarkerClassifier } from "./SemanticMarkerClassifier";

export class InlineMarkerGuard {
    constructor( private classifier = new SemanticMarkerClassifier() ) {}
    
    isInline( marker: SemanticMarker ): boolean {

        return ( this.classifier .classify( marker.type ) .category === "inline" );
    }

}