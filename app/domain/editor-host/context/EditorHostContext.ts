import type { EditorPresentationApi }
from "../../editor-presentation/public-api/EditorPresentationApi";

export interface EditorHostContext{

    readonly presentation:EditorPresentationApi;

}