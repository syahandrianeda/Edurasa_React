import type { SemanticMarker }
from "./SemanticMarker";

import type { SemanticMarkerType }
from "./SemanticMarkerType";

import type { SelectionState }
from "../selection/SelectionState";

export class SemanticMarkerService {

    create(

        type:
            SemanticMarkerType,

        selection:
            SelectionState

    ): SemanticMarker {

        return {

            id:
                crypto.randomUUID(),

            type,

            selection

        };

    }

}