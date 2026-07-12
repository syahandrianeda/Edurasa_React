import type { EditorPresentationContext }
from "../context/EditorPresentationContext";

import type { EditorPresentationSession }
from "../session/EditorPresentationSession";

import type { EditorPresentationStore }
from "../store/EditorPresentationStore";

import type { EditorPresentationController }
from "../controller/EditorPresentationController";

import type { EditorPresentationCommandDispatcher }
from "../dispatcher/EditorPresentationCommandDispatcher";

import type { EditorPresentationStateSynchronizer }
from "../synchronizer/EditorPresentationStateSynchronizer";

export interface EditorPresentationRuntime{

    readonly context:
        EditorPresentationContext;

    readonly session:
        EditorPresentationSession;

    readonly store:
        EditorPresentationStore;

    readonly controller:
        EditorPresentationController;

    readonly dispatcher:
        EditorPresentationCommandDispatcher;

    readonly synchronizer:
        EditorPresentationStateSynchronizer;

}