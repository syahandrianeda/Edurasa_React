import { useReactEditorSession }
from "../session/useReactEditorSession";

export function usepresentation(){

    const session =
        useReactEditorSession();

    return session.platform.presentation;

}