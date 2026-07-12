import type { EditorHostIntegration }
from "../integration/EditorHostIntegration";

import type { EditorHostValidator }
from "../validation/EditorHostValidator";

import type { EditorHostLifecycle }
from "../lifecycle/EditorHostLifecycle";

export interface EditorHostArchitecture{

    readonly integration:EditorHostIntegration;

    readonly validator:EditorHostValidator;

    readonly lifecycle:EditorHostLifecycle;

}