import type { EditorDocument } from "../EditorDocument";
import type { SemanticMarker } from "../semantic/SemanticMarker";
import type { MarkerResolveResult } from "./MarkerResolveResult";
import type { SectionNode } from "~/domain/editor/sections/section-node";
import { NodeTraversalEngine } from "../traversal/NodeTraversalEngine";
import type { SemanticMarkerType } from "../semantic/SemanticMarkerType";
import type { SectionType } from "~/domain/editor/sections/section-soal-type";

export class SemanticMarkerResolver {
    constructor(
        private traversal =
            new NodeTraversalEngine()
    ) {}

    resolve(
        marker:
            SemanticMarker,
        document:
            EditorDocument
    ): MarkerResolveResult {
        const sectionType = this.resolveSectionType( marker.type );

        if (!sectionType) {

            return {

                success:false,

                message:
                    "Marker bukan section"

            };

        }
        const result =
            this.traversal
                .traverse(
                    document,
                    marker.selection.range
                );
        const section: SectionNode = {

            id: marker.id,
            type: sectionType,// sudah diubah
            visibility: "public",
            children: result.fragment .nodes
        };

        return {

            success:true,

            section

        };

    }
    private resolveSectionType(
        markerType: SemanticMarkerType
    ): SectionType | null {

        switch (markerType) {

            case "stimulus":
            case "pertanyaan":
            case "pembahasan":
                return markerType;

            default:
                return null;

        }

    }

}