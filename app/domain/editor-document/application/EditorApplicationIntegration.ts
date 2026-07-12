import type { EditorApplication }
from "./EditorApplication";

import type { EditorApplicationService }
from "./service/EditorApplicationService";

import type { EditorPublicApi }
from "./api/EditorPublicApi";

export interface EditorApplicationIntegration{

    readonly application: EditorApplication;

    readonly service: EditorApplicationService;

    readonly api: EditorPublicApi;

}