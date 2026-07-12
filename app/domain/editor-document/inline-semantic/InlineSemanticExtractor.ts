import type { EditorDocument } from "../EditorDocument";
import type { SemanticMarker } from "../semantic/SemanticMarker";
import type { InlineSemanticExtractionResult } from "./InlineSemanticExtractionResult";
import { EntityResolver } from "../entity/EntityResolver";
import { EquationResolver } from "../equation/EquationResolver";

export class InlineSemanticExtractor {

    constructor(
        private entityResolver = new EntityResolver(),
        private equationResolver = new EquationResolver()
    ) {}

    extract( markers: SemanticMarker[], document: EditorDocument ): InlineSemanticExtractionResult {

        const entityResult = this.entityResolver .resolve( markers, document );
        const equationResult = this.equationResolver .resolve( markers, document );

        return {
            collection: {
                entities: entityResult .entities,
                equations: equationResult .equations
            }
        };

    }

}