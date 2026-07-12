import type { QuestionStructure }
from "../structure/QuestionStructure";

export class InteractionTypeDetector {

    detect(
        structure:
            QuestionStructure
    ): string {

        if (

            structure.opsi.length > 0

        ) {

            return "option-group";

        }

        return "response";

    }

}