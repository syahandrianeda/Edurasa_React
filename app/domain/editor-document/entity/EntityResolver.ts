import type { EditorDocument } from "../EditorDocument";
import type { SemanticMarker } from "../semantic/SemanticMarker";
import type { EntityResolveResult } from "./EntityResolveResult";
import { NodeTraversalEngine } from "../traversal/NodeTraversalEngine";
import { FragmentTextBuilder } from "../extraction/FragmentTextBuilder";
import type { EntityNode } from "~/domain/editor/inlines/entities-node";

export class EntityResolver {

    constructor( 
        private traversal = new NodeTraversalEngine(), 
        private textBuilder = new FragmentTextBuilder() 
    ) {}

    resolve( markers: SemanticMarker[], document: EditorDocument ): EntityResolveResult {

        const entities:
            EntityNode[]
            = [];

        for ( const marker of markers ) {

            if ( marker.type !== "entity" ) {
                continue;
            }

            const traversalResult = this.traversal .traverse( document, marker .selection .range );
            const textResult = this.textBuilder .build( traversalResult .fragment );
            const entity: EntityNode = {
                type: "entity",
                entityType: "generic",
                metadata: { sourceMarkerId: marker.id, text: textResult.text },
                children: []
                };

            entities.push( entity );

        }

        return {
            entities
        };
    }

}