import type { EditorHostApi }
from "../../../domain/editor-host/public-api/EditorHostApi";

export interface ReactEditorContext{

    readonly host:EditorHostApi;

}