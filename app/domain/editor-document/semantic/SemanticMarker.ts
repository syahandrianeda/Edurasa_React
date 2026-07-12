import type { SelectionState } from "../selection/SelectionState";
import type { SemanticMarkerType } from "./SemanticMarkerType";

export interface SemanticMarker {

    id:string;

    type:SemanticMarkerType;

    selection:SelectionState;

}