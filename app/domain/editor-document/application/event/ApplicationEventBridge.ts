import type { EditorEvent }
from "../../engine/event/EditorEvent";

export interface ApplicationEventBridge{

    dispatch(

        event: EditorEvent

    ): void;

}