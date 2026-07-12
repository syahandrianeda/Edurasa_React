import type { EditorDocument } from "../EditorDocument";
import type { SemanticMarker } from "../semantic/SemanticMarker";
import type { EquationResolveResult } from "./EquationResolveResult";
import type { EquationNode } from "./EquationNode";
import { NodeTraversalEngine } from "../traversal/NodeTraversalEngine";
import { FragmentTextBuilder } from "../extraction/FragmentTextBuilder";

export class EquationResolver {

    constructor( private traversal = new NodeTraversalEngine(), private textBuilder = new FragmentTextBuilder() ) {}

    resolve( markers: SemanticMarker[], document: EditorDocument ): EquationResolveResult {

        const equations:
            EquationNode[]
            = [];

        for ( const marker of markers ) {

            if ( marker.type !== "equation" ) {

                continue;

            }

            const traversalResult = this.traversal .traverse( document, marker .selection .range );
            const textResult = this.textBuilder .build( traversalResult .fragment );

            equations.push({
                id: marker.id,
                expression: textResult .text .trim()
            });
        }

        return {

            equations

        };

    }

}