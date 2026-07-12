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

import type { EditorPresentationRuntime }
from "./EditorPresentationRuntime";

import type { EditorPresentationRuntimeResult }
from "./EditorPresentationRuntimeResult";

export class EditorPresentationRuntimeBuilder{

    build(

        context:EditorPresentationContext,

        session:EditorPresentationSession,

        store:EditorPresentationStore,

        controller:EditorPresentationController,

        dispatcher:EditorPresentationCommandDispatcher,

        synchronizer:EditorPresentationStateSynchronizer

    ):EditorPresentationRuntimeResult{

        const runtime:EditorPresentationRuntime={

            context,

            session,

            store,

            controller,

            dispatcher,

            synchronizer

        };

        return{

            success:true,

            runtime

        };

    }

}