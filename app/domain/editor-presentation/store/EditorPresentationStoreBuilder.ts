import type { EditorPresentationContext } from "../context/EditorPresentationContext";
import type { EditorPresentationSession } from "../session/EditorPresentationSession";
import type { EditorPresentationStore } from "./EditorPresentationStore";
import type { EditorPresentationStoreResult } from "./EditorPresentationStoreResult";

export class EditorPresentationStoreBuilder{

    build(

        context:EditorPresentationContext,

        session:EditorPresentationSession

    ):EditorPresentationStoreResult{

        const store:EditorPresentationStore={

            context,

            session

        };

        return{

            success:true,

            store

        };

    }

}