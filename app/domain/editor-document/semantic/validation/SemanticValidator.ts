import type { SemanticDocument }
from "../SemanticDocument";

import type { SemanticGroup }
from "../SemanticGroup";

import type { SemanticMarker }
from "../SemanticMarker";

import type { SemanticValidationResult }
from "./SemanticValidationResult";

import type { SemanticValidationError }
from "./SemanticValidationError";

export class SemanticValidator {

    validate(

        document:
            SemanticDocument

    ): SemanticValidationResult {

        const errors:
            SemanticValidationError[]
            = [];

        this.validateGroups(
            document,
            errors
        );

        return {

            valid:
                errors.length === 0,

            errors

        };

    }

    private validateGroups(

        document:
            SemanticDocument,

        errors:
            SemanticValidationError[]

    ): void {

        for (

            const group

            of document.groups

        ) {

            this.validateGroup(
                group,
                document,
                errors
            );

        }

    }

    private validateGroup(

        group:
            SemanticGroup,

        document:
            SemanticDocument,

        errors:
            SemanticValidationError[]

    ): void {

        if (

            group
                .questionMarkerIds
                .length === 0

        ) {

            errors.push({

                code:
                    "GROUP_NO_QUESTION",

                message:
                    `Group ${group.id} tidak memiliki pertanyaan`

            });

        }

        if (

            group.stimulusMarkerId

        ) {

            const stimulus =

                document
                    .markers
                    .find(

                        marker =>

                            marker.id ===

                            group
                                .stimulusMarkerId

                    );

            if (
                !stimulus
            ) {

                errors.push({

                    code:
                        "STIMULUS_NOT_FOUND",

                    message:
                        `Stimulus marker tidak ditemukan pada group ${group.id}`

                });

            }

        }

        this.validateQuestions(
            group,
            document,
            errors
        );

    }

    private validateQuestions(

        group:
            SemanticGroup,

        document:
            SemanticDocument,

        errors:
            SemanticValidationError[]

    ): void {

        const unique =
            new Set<string>();

        for (

            const markerId

            of group
                .questionMarkerIds

        ) {

            if (
                unique.has(
                    markerId
                )
            ) {

                errors.push({

                    code:
                        "DUPLICATE_QUESTION_MARKER",

                    message:
                        `Question marker ${markerId} duplikat`

                });

            }

            unique.add(
                markerId
            );

            const marker =

                document
                    .markers
                    .find(

                        marker =>

                            marker.id ===
                            markerId

                    );

            if (
                !marker
            ) {

                errors.push({

                    code:
                        "QUESTION_NOT_FOUND",

                    message:
                        `Question marker ${markerId} tidak ditemukan`

                });

            }

        }

    }

}