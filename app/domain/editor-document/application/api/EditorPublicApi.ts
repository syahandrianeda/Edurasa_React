import type { EditorApplication }
from "../EditorApplication";

import type { EditorCommand }
from "../../engine/command/EditorCommand";

import type { EditorApplicationService }
from "../service/EditorApplicationService";

import type { EditorDocument }
from "../../EditorDocument";

export interface EditorPublicApi{

    readonly application: EditorApplication;

    readonly service: EditorApplicationService;

    execute(
        command: EditorCommand
    ): void;

    document(): EditorDocument;

    state(): string;

}