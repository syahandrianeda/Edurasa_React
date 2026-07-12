import type {
    InteractionNode,
    OptionGroupNode,
    ResponseNode
}
from "~/domain/editor/interactions/base-node-interaction";

import type { QuestionStructure }
from "../structure/QuestionStructure";

import type { InteractionBuildResult }
from "./InteractionBuildResult";

import { InteractionTypeDetector }
from "./InteractionTypeDetector";

import { OptionResolver }
from "./OptionResolver";

import type { EditorDocument }
from "../EditorDocument";

export class InteractionBuilder {

    constructor(

        private detector =
            new InteractionTypeDetector(),

        private optionResolver =
            new OptionResolver()

    ) {}

    build(

        structure:
            QuestionStructure,

        document:
            EditorDocument

    ): InteractionBuildResult {

        const type =

            this.detector
                .detect(
                    structure
                );

        if (

            type ===
            "option-group"

        ) {

            const optionResult =

                this.optionResolver
                    .resolve(

                        structure.opsi,

                        document

                    );

            const interaction:
                OptionGroupNode = {

                interactionType:
                    "option-group",

                options:
                    optionResult.options

            };

            return {

                success:true,

                interaction

            };

        }

        const interaction:
            ResponseNode = {

            interactionType:
                "response"

        };

        return {

            success:true,

            interaction

        };

    }

}