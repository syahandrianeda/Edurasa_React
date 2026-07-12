import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

import type { EditorHostValidatorResult }
from "./EditorHostValidatorResult";

export interface EditorHostValidator{

    readonly runtime:EditorHostRuntime;

    validate():EditorHostValidatorResult;

}