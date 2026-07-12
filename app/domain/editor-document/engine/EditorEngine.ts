import type { EditorEngineState } from "./EditorEngineState";
import type { EditorCommandBus } from "./command/EditorCommandBus";
import type { EditorContext } from "./context/EditorContext";
import type { EditorEventDispatcher } from "./event/EditorEventDispatcher";
import type { EditorLifecycle } from "./lifecycle/EditorLifecycle";
import type { EditorTransaction } from "./transaction/EditorTransaction";

export interface EditorEngine{

    state: EditorEngineState;
    commandBus: EditorCommandBus;
    eventDispatcher: EditorEventDispatcher;
    lifecycle: EditorLifecycle;
    context: EditorContext;
    transaction: EditorTransaction;
}