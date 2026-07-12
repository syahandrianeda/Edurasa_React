import type { EditorPresentationContext } from "../context/EditorPresentationContext";
import type { EditorPresentationSession } from "../session/EditorPresentationSession";

export interface EditorPresentationStore{

    readonly context:
        EditorPresentationContext;

    readonly session:
        EditorPresentationSession;

}