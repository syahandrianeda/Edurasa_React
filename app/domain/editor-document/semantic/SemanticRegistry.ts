import type { SemanticDocument }
from "./SemanticDocument";

import type { SemanticMarker }
from "./SemanticMarker";

import type { SemanticGroup }
from "./SemanticGroup";

export class SemanticRegistry {

    constructor(

        private document:
            SemanticDocument

    ) {}

    getMarkers():
        SemanticMarker[]
    {

        return this
            .document
            .markers;

    }

    getGroups():
        SemanticGroup[]
    {

        return this
            .document
            .groups;

    }

    findMarker(

        markerId:
            string

    ):
        SemanticMarker
        | undefined
    {

        return this
            .document
            .markers
            .find(

                marker =>

                    marker.id ===
                    markerId

            );

    }

    findGroup(

        groupId:
            string

    ):
        SemanticGroup
        | undefined
    {

        return this
            .document
            .groups
            .find(

                group =>

                    group.id ===
                    groupId

            );

    }

    addMarker(

        marker:
            SemanticMarker

    ): void {

        this
            .document
            .markers
            .push(
                marker
            );

    }

    addGroup(

        group:
            SemanticGroup

    ): void {

        this
            .document
            .groups
            .push(
                group
            );

    }

    removeMarker(

        markerId:
            string

    ): void {

        this.document.markers =

            this.document
                .markers
                .filter(

                    marker =>

                        marker.id !==
                        markerId

                );

        for (

            const group

            of this.document
                .groups

        ) {

            if (

                group
                    .stimulusMarkerId

                ===

                markerId

            ) {

                group
                    .stimulusMarkerId =
                        undefined;

            }

            group.questionMarkerIds =

                group
                    .questionMarkerIds
                    .filter(

                        id =>

                            id !==
                            markerId

                    );

        }

    }

}