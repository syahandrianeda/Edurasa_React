import type { EditorEvent }
from "./EditorEvent";

import type { EditorEventResult }
from "./EditorEventResult";

export interface EditorEventListener{

    handle(

        event:
            EditorEvent

    ):EditorEventResult;

}