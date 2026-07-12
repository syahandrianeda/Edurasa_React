import type { SemanticGroup }
from "./SemanticGroup";

export class SemanticGroupService {

    create(): SemanticGroup {

        return {

            id:
                crypto.randomUUID(),

            questionMarkerIds:[]

        };

    }

    addQuestion(

        group:
            SemanticGroup,

        markerId:
            string

    ): void {

        if (

            !group
                .questionMarkerIds
                .includes(
                    markerId
                )

        ) {

            group
                .questionMarkerIds
                .push(
                    markerId
                );

        }

    }

    setStimulus(

        group:
            SemanticGroup,

        markerId:
            string

    ): void {

        group
            .stimulusMarkerId =
                markerId;

    }

}